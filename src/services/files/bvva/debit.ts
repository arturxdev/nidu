import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
dayjs.extend(customParseFormat)
import { logger } from '@/lib/logger';

export async function processBBVADebit(userId: string, file: File) {
  logger.info('processing file')
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
  for (let index = 1; index < tvm.length; index++) {
    const data = tvm[index] as any;
    if (data[2] === null && data[3] == null) continue;
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
