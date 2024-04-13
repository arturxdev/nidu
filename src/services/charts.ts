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
  }
}
