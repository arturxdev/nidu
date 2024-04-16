import connectMongo from "@/lib/mongoose"
import { TransactionModel } from "@/models/transaccion"

export const chartService = {
  resume: async (userId: string, startDate: Date, endDate: Date) => {
    await connectMongo()
    const ingresos = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          userId: userId,
          omit: {
            $in: [false, null]
          },
        }
      },
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" }
        }
      },
    ])
    const gastos = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          omit: {
            $in: [false, null]
          },
          type: "outcome"
        }
      },
      {
        $sort: { amount: -1 } // Ordenar en orden descendente por el campo 'amount'
      },
      {
        $limit: 3 // Limitar los resultados a los 5 primeros
      }
    ])
    const categories = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          omit: {
            $in: [false, null]
          },
          type: "outcome"
        }
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { totalAmount: -1 } // Ordenar en orden descendente por el campo 'totalAmount'
      }
    ])

    return {
      gastos,
      ingresos,
      categories
    }
  },
  dashboard: async (userId: string, startDate: Date, endDate: Date) => {
    const outcome = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          omit: {
            $in: [false, null]
          },
          type: "outcome"
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          value: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          value: 1
        }
      },
    ])
    const income = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          omit: {
            $in: [false, null]
          },
          type: "income"
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          value: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          value: 1
        }
      },
    ])
    const categories = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          omit: {
            $in: [false, null]
          },
          type: "outcome"
        }
      },
      {
        $group: {
          _id: "$category",
          value: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1
        }
      },
      {
        $sort: { value: -1 } // Ordenar en orden descendente por el campo 'totalAmount'
      }
    ])
    const test = await TransactionModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          omit: {
            $in: [false, null]
          },
          type: "outcome"
        }
      },
    ])
    console.log(test)
    return {
      categories,
      outcome,
      income
    }
  }
}
