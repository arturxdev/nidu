import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
import { logger } from '@/lib/logger';
dayjs.extend(customParseFormat)

export async function processBBVADebit(userId: string, file: File) {
  try {
    await connectMongo()
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const workbook = xlsx.read(buffer);
    let workbook_sheet = workbook.SheetNames;
    let tvm = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]], {
      header: 1,
      range: 3,
      raw: false,
      defval: null,
      blankrows: false,
      skipHidden: true,
    });
    const firstRow = tvm[0] as any
    let transactions = []
    let minorDate = dayjs(firstRow[0], "DD/MM/YYYY")
    let majorDate = dayjs(firstRow[0], "DD/MM/YYYY")
    for (let index = 1; index < tvm.length; index++) {
      const data = tvm[index] as any;
      if (data[2] === null && data[3] == null) continue;
      if (dayjs(data[0], "DD/MM/YYYY").isAfter(majorDate, 'day')) majorDate = dayjs(data[0], "DD/MM/YYYY")
      if (dayjs(data[0], "DD/MM/YYYY").isBefore(minorDate, 'day')) minorDate = dayjs(data[0], "DD/MM/YYYY")
      const amount = data[2] == '' ? data[3].replace(/,/g, '') : data[2].replace(/,/g, '')
      const bankId = `${data[0]}/${amount}/${data[4].replace(/,/g, '')}`
      const payload = {
        bankId,
        userId,
        bank: 'bbva',
        card: 'debit',
        origin: "automatic",
        type: data[2] ? 'outcome' : 'income',
        description: data[1],
        date: dayjs(data[0], "DD/MM/YYYY"),
        amount: Math.abs(parseFloat(amount)),
        status: data[4] == 'En tránsito' ? 'transit' : 'processed'
      };
      transactions.push(payload)
    }
    logger.info('saving transactions')
    await TransactionModel.deleteMany({ where: { userId, bank: 'amex', card: 'credit', date: { $gte: minorDate.toDate(), $lte: majorDate.toDate() } } })
    await TransactionModel.insertMany(transactions)
    logger.info('file processed')
    return
  } catch (error) {
    logger.error(error)
    throw new Error('error processing file')
  }
}

