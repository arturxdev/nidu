import connectMongo from "@/lib/mongoose";
import { TransactionModel } from "@/models/transaccion";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const chartService = {
  resume: async (userId: string, startDate?: Date, endDate?: Date) => {
    await connectMongo();
    const today = dayjs().utc(true);
    const start = startDate ?? today.startOf("month");
    const end = endDate ?? today;
    const balancePre = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          userId: userId,
          omit: {
            $in: [false, null],
          },
        },
      },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const gastos = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          userId: userId,
          omit: {
            $in: [false, null],
          },
          type: "outcome",
        },
      },
      {
        $sort: { amount: -1 },
      },
      {
        $limit: 3,
      },
    ]);
    const categories = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
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
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);
    let balance: any = {
      income: 0,
      outcome: 0,
    };
    balancePre.forEach((item: any) => {
      balance[item._id] = item.totalAmount;
    });
    return {
      gastos,
      balance,
      categories,
    };
  },
  dashboard: async (userId: string, startDate: Date, endDate: Date) => {
    const outcome = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
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
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          value: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          value: 1,
        },
      },
    ]);
    const income = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          userId: userId,
          omit: {
            $in: [false, null],
          },
          type: "income",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          value: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          value: 1,
        },
      },
    ]);
    const categories = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
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
          _id: "$category",
          value: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1,
        },
      },
      {
        $sort: { value: -1 },
      },
    ]);
    return {
      categories,
      outcome,
      income,
    };
  },
};
