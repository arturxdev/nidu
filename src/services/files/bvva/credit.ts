import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
import { logger } from '@/lib/logger';
dayjs.extend(customParseFormat)

export async function processBBVACredit(userId: string, file: File) {
  logger.info('processing file')
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
      blankrows: true,
      skipHidden: true,
    });

    let transactions = []
    const firstRow = tvm[0] as any
    let minorDate = dayjs(firstRow[0], "DD/MM/YYYY")
    let majorDate = dayjs(firstRow[0], "DD/MM/YYYY")

    for (let index = 1; index < tvm.length; index++) {
      const data = tvm[index] as any;
      if (data[2] === null || data[2] == '') continue;
      if (dayjs(data[0], "DD/MM/YYYY").isAfter(majorDate, 'day')) majorDate = dayjs(data[0], "DD/MM/YYYY")
      if (dayjs(data[0], "DD/MM/YYYY").isBefore(minorDate, 'day')) minorDate = dayjs(data[0], "DD/MM/YYYY")
      const bankId = `${data[0]}/${data[2].replace(/,/g, '')}/${data[4] == 'En tránsito' ? 'transit' : data[4].replace(/,/g, '')}`
      const payload = {
        bankId,
        userId,
        bank: 'bbva',
        card: 'credit',
        type: data[2] ? 'outcome' : 'income',
        origin: 'automatic',
        date: dayjs(data[0], "DD/MM/YYYY"),
        description: data[1],
        amount: parseFloat(data[2].replace(/,/g, '')),
        status: data[4] == 'En tránsito' ? 'transit' : 'processed'
      };
      transactions.push(payload)
    }
    logger.info('saving transactions')
    await TransactionModel.deleteMany({ where: { userId, bank: 'amex', card: 'credit', date: { $gte: minorDate.toDate(), $lte: majorDate.toDate() } } })
    await TransactionModel.insertMany(transactions)
    logger.info('file prosessed')
    return
  } catch (error) {
    logger.error(error)
    throw new Error('error processing file')
  }
}

