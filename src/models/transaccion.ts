import { Schema, model, models } from 'mongoose';
import toJSON from './plugins/toJSON';
const transactionSchema = new Schema({
  bankId: { type: String, required: true, unique: true },
  bank: { type: String, required: true },
  userId: { type: String, required: true },
  amount: Number,
  date: Date,
  status: String,
  type: String,
  origin: String,
  description: String,
  descriptionUser: String,
  card: String,
  category: { type: String, default: 'uncategorized' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
  });
// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);

export const TransactionModel = models.transactions || model("transactions", transactionSchema)

