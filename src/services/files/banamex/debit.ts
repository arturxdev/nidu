import * as xlsx from "xlsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import connectMongo from "@/lib/mongoose";
import { TransactionModel } from "@/models/transaccion";
dayjs.extend(customParseFormat);
dayjs.extend(utc);
import { logger } from "@/lib/logger";
import "dayjs/locale/es";
import es from "dayjs/locale/es";
dayjs.locale(es);

export async function processBanamexDebit(userId: string, file: File) {
  logger.info("processing file");
  await connectMongo();
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
    const bankId = `${dayjs(data[0].toLowerCase(), "DD MMM YYYY")
      .utc(true)
      .toISOString()}/${data[4]
      .replace(/,/g, "")
      .replace(/\$/g, "")
      .replace(/ /g, "")}`;
    const outflow = data[3]
      .replace(/,/g, "")
      .replace(/\$/g, "")
      .replace(/ /g, "");
    const inflow = data[2]
      .replace(/,/g, "")
      .replace(/\$/g, "")
      .replace(/ /g, "");
    let amount = "";
    let type = "";
    if (outflow) {
      amount = outflow;
      type = "outflow";
    } else {
      amount = inflow;
      type = "inflow";
    }
    // const bankId = `${data[2]}`
    const payload = {
      bankId,
      userId,
      bank: "banamex",
      card: "debit",
      origin: "automatic",
      type,
      description: data[1],
      date: dayjs(data[0].toLowerCase(), "DD MMM YYYY").utc(true),
      amount: Math.abs(parseFloat(amount)),
      status: "processed",
    };
    console.log(payload.type, payload.amount);
    // const operationExists = await TransactionModel.findOne({ bankId })
    // if (operationExists) {
    //   logger.info('operation already exists')
    //   continue;
    // }
    // const operationSaved = await TransactionModel.create({ ...payload })
    // logger.info('operation saved')
  }
  return;
}
