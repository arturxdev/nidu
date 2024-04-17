import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
import 'dayjs/locale/es'
import { logger } from '@/lib/logger';
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
      range: 7,
      raw: false,
      defval: null,
      blankrows: true,
      skipHidden: true,
    });
    const firstRow = tvm[0] as any
    let minorDate = dayjs(firstRow[0], "DD MMM YYYY")
    let majorDate = dayjs(firstRow[0], "DD MMM YYYY")
    logger.info('formatting')
    for (let index = 1; index < tvm.length; index++) {
      const data = tvm[index] as any;
      const amount = parseFloat(data[5].replace(/,/g, '').replace(/\$/g, ''))
      if (amount < 0) continue
      if (dayjs(data[0], "DD MMM YYYY").isBefore(minorDate, 'day')) minorDate = dayjs(data[0], "DD MMM YYYY")
      if (dayjs(data[0], "DD MMM YYYY").isAfter(majorDate, 'day')) majorDate = dayjs(data[0], "DD MMM YYYY")

      const payload = {
        bankId: data[14],
        userId,
        bank: 'amex',
        card: 'credit',
        type: 'outcome',
        origin: 'automatic',
        date: dayjs(data[0], "DD MMM YYYY"),
        description: data[2],
        amount: amount,
        status: 'processed',
        spender: data[3] ?? ''
      };
      const transactionExists = await TransactionModel.findOne({ bankId: payload.bankId })
      if (transactionExists) {
        logger.info('transaction exists')
        continue
      }
      await TransactionModel.create(payload)
      logger.info('transaction created')
    }
    return
  } catch (error) {
    logger.error(error)
    throw new Error('error processing file')
  }
}

