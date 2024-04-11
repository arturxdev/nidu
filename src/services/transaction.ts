import { Filter } from "@/entities/filter";
import { Transaction } from "@/entities/transaccions";
import connectMongo from "@/lib/mongoose";
import { TransactionModel } from "@/models/transaccion";
import { SortOrder } from "mongoose";

export const transactionService = {
  create: async (data: Transaction) => {
    await connectMongo();
    return TransactionModel.create(data);
  },
  update: async (transactionId: string, data: Partial<Transaction>) => {
    await connectMongo();
    return TransactionModel.updateOne(
      { _id: transactionId },
      { descriptionUser: data.descriptionUser, category: data.category, omit: data.omit }
    );
  },
  get: async (
    limit: number = 10,
    page: number = 0,
    order: string = "desc",
    userId: string
  ) => {
    await connectMongo();
    const transactionsTotal = await TransactionModel.find({ userId });
    const transactions = await TransactionModel.find({ userId })
      .skip(page)
      .limit(limit)
      .sort({ date: order as SortOrder });
    const transformedResults = transactions.map((result: any) => {
      const {
        _doc: { _id, __v, ...restDataUser },
      } = result;
      return { id: _id.toString(), ...restDataUser };
    });
    return {
      total: transactionsTotal.length,
      limit,
      page,
      results: transformedResults,
    };
  },
};
