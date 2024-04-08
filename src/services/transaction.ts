import { Transaction } from "@/entities/transaccions";
import connectMongo from "@/lib/mongoose";
import { TransactionModel } from "@/models/transaccion";
import { SortOrder } from "mongoose";


export const transactionService = {
  create: async (data: Transaction) => {
    await connectMongo()
    return TransactionModel.create(data)
  },
  update: async (transactionId: string, data: Partial<Transaction>) => {
    await connectMongo()
    return TransactionModel.updateOne({ _id: transactionId }, { descriptionUser: data.descriptionUser, category: data.category })
  },
  get: async (limit: number = 10, skip: number = 0, sort: string = 'desc', userId: string) => {
    await connectMongo()
    const transactionsTotal = await TransactionModel.find({ where: { userId } })
    const transactions = await TransactionModel.find({ where: { userId } }).skip(skip).limit(limit).sort({ date: sort as SortOrder })
    const transformedResults = transactions.map((result: any) => {
      const { _doc: { _id, __v, ...restDataUser } } = result;
      return { id: _id.toString(), ...restDataUser };
    });
    return {
      total: transactionsTotal.length,
      limit,
      skip,
      results: transformedResults
    }
  }
}
