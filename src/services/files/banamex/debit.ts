import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
dayjs.extend(customParseFormat)
dayjs.extend(utc)
import { logger } from '@/lib/logger';
import 'dayjs/locale/es'

export async function processBanamexDebit(userId: string, file: File) {
  logger.info('processing file')
  await connectMongo()
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const workbook = xlsx.read(buffer);
  let workbook_sheet = workbook.SheetNames;
  let tvm = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]], {
    header: 1,
    raw: false,
    defval: null,
    blankrows: false,
    skipHidden: true,
  });
  for (let index = 1; index < tvm.length; index++) {
    const data = tvm[index] as any;
    const amount = data[3].replace(/,/g, '')
    const bankId = `${data[2]}`
    const payload = {
      bankId,
      userId,
      bank: 'banamex',
      card: 'debit',
      origin: "automatic",
      type: 'outcome',
      description: data[1],
      date: dayjs(data[0], "DD MMM YYYY HH:mm").utc(true),
      amount: Math.abs(parseFloat(amount)),
      status: data[4] !== 'Aplicada' ? 'transit' : 'processed'
    };
    const operationExists = await TransactionModel.findOne({ bankId })
    if (operationExists) {
      logger.info('operation already exists')
      continue;
    }
    const operationSaved = await TransactionModel.create({ ...payload })
    logger.info('operation saved')
  }
  return
}
