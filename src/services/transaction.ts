import { Transaction } from "@/entities/transaccions";
import connectMongo from "@/lib/mongoose";
import { TransactionModel } from "@/models/transaccion";

export const updateTransaction = async (transactionId: string, data: Partial<Transaction>) => {
  await connectMongo()
  return TransactionModel.updateOne({ _id: transactionId }, { descriptionUser: data.descriptionUser, category: data.category })
}
export const getTransactions = async () => {
  await connectMongo()
  const transactions = await TransactionModel.find({}).sort({ date: -1 })
  const transformedResults = transactions.map((result: any) => {
    const { _doc: { _id, __v, ...restDataUser } } = result;
    return { id: _id.toString(), ...restDataUser };
  });
  return transformedResults
}
