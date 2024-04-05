import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
import 'dayjs/locale/es'
import { logger } from '@/lib/logger';
dayjs.locale('es')
dayjs.extend(customParseFormat)

export async function processAMEXCredit(userId: string, file: File) {
  logger.info('processing file')
  try {
    await connectMongo()
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const workbook = xlsx.read(buffer);
    let workbook_sheet = workbook.SheetNames;
    let tvm = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]], {
      header: 1,
      range: 19,
      raw: false,
      defval: null,
      blankrows: true,
      skipHidden: true,
    });
    let transactions = []
    const firstRow = tvm[0] as any
    let minorDate = dayjs(firstRow[0], "DD MMM YYYY", "es")
    let majorDate = dayjs(firstRow[0], "DD MMM YYYY", "es")
    logger.info('formatting')
    for (let index = 1; index < tvm.length; index++) {
      const data = tvm[index] as any;
      const amount = parseFloat(data[4].replace(/,/g, '').replace(/\$/g, ''))
      if (amount < 0) continue
      if (dayjs(data[0], "DD MMM YYYY", "es").isBefore(minorDate, 'day')) minorDate = dayjs(data[0], "DD MMM YYYY", "es")
      if (dayjs(data[0], "DD MMM YYYY", "es").isAfter(majorDate, 'day')) majorDate = dayjs(data[0], "DD MMM YYYY", "es")

      const bankId = `${dayjs(data[0], "DD MMM YYYY", "es").format('DD/MM/YYYY')}/${dayjs(data[1], "DD MMM YYYY", "es").format('DD/MM/YYYY')}/${data[4].replace(/,/g, '').replace(/\$/g, '')}`

      const payload = {
        bankId,
        userId,
        bank: 'amex',
        card: 'credit',
        type: 'outcome',
        origin: 'automatic',
        date: dayjs(data[0], "DD MMM YYYY", "es"),
        description: data[2],
        amount: amount,
        status: 'processed',
        spender: data[3] ?? ''
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

