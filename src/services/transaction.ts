import { Transaction } from "@/entities/transaccions";
import connectMongo from "@/lib/mongoose";
import { TransactionModel } from "@/models/transaccion";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
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
      {
        descriptionUser: data.descriptionUser,
        category: data.category,
        omit: data.omit,
      }
    );
  },
  getBanks: async (userId: string, startDate?: Date, endDate?: Date) => {
    const today = dayjs().utc(true);
    const start = startDate ?? today.startOf("month");
    const end = endDate ?? today;
    await connectMongo();
    return TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lte: end,
          },
          userId: userId,
          omit: {
            $in: [false, null],
          },
          type: "outcome",
        },
      },
      {
        $group: {
          _id: {
            bank: "$bank",
            type: "$card",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);
  },
  get: async (
    limit: number = 10,
    page: number = 0,
    order: string = "desc",
    userId: string,
    startDate?: Date,
    endDate?: Date
  ) => {
    const today = dayjs().utc(true);
    const start = startDate ?? today.startOf("month");
    const end = endDate ?? today;
    await connectMongo();
    const transactionsTotal = await TransactionModel.find({
      userId,
      date: {
        $gte: start,
        $lte: end,
      },
    });
    const transactions = await TransactionModel.find({
      userId,
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .skip(page)
      .limit(limit)
      .sort({ date: order as SortOrder });
    const transformedResults: any = transactions.map((result: any) => {
      const {
        _doc: { _id, __v, ...restDataUser },
      } = result;
      return {
        id: _id.toString(),
        date: restDataUser.date.toString(),
        ...restDataUser,
      };
    });
    return {
      total: transactionsTotal.length,
      limit,
      page,
      results: transformedResults,
    };
  },
};
