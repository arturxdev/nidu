import * as xlsx from 'xlsx';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import connectMongo from '@/lib/mongoose';
import { TransactionModel } from '@/models/transaccion';
dayjs.extend(customParseFormat)

export async function processBBVACredit(userId: string, file: File) {
  console.log('processing file')
  try {
    console.log(userId)
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
    for (let index = 1; index < tvm.length; index++) {
      const data = tvm[index] as any;
      if (data[2] === null || data[2] == '') continue;
      const bankId = `${data[0]}/${data[2].replace(/,/g, '')}/${data[4] == 'En tránsito' ? 'transit' : data[4].replace(/,/g, '')}`
      const bankIdToSearch = `${data[0]}/${data[2].replace(/,/g, '')}/transit`
      const operationTransitExists = await TransactionModel.findOne({ bankId: bankIdToSearch })
      if (operationTransitExists && data[4] !== 'En tránsito') {
        console.log('update bankId transit to processed')
        await TransactionModel.updateOne({ bankId: bankIdToSearch }, { status: 'processed', bankId: bankId })
      }
      const payload = {
        bankId,
        userId,
        bank: 'bbva',
        card: 'credit',
        type: data[2] ? 'outcome' : 'income',
        date: dayjs(data[0], "DD/MM/YYYY"),
        description: data[1],
        amount: parseFloat(data[2].replace(/,/g, '')),
        status: data[4] == 'En tránsito' ? 'transit' : 'processed'
      };
      const operationExists = await TransactionModel.findOne({ bankId })
      if (operationExists) {
        await TransactionModel.updateOne({ bankId }, { status: payload.status, type: payload.type })
        console.log('operation updated')
        continue;
      }
      // console.log(payload)
      const operationSaved = await TransactionModel.create({ ...payload })
      // console.log(operationSaved)
      console.log('operation saved')
    }
    return
  } catch (error) {
    console.log(error)
    throw new Error('error processing file')
  }
}

