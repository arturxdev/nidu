import { Schema, model, models } from 'mongoose';
import toJSON from './plugins/toJSON';
const transactionSchema = new Schema({
  bankId: { type: String, required: true },
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
  omit: { type: Boolean, default: false },
  category: { type: String, default: 'uncategorized' },
  spender: { type: String, default: '' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
  });
// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);

export const TransactionModel = models.transactions || model("transactions", transactionSchema)

