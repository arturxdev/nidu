import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bankId: z.string(),
  bank: z.string(),
  amount: z.number().nullable(),
  date: z.coerce.date(),
  status: z.string(),
  description: z.string(),
  descriptionUser: z.string().default(''),
  card: z.string(),
  category: z.string().default('uncategorized')
})

export type Transaction = z.infer<typeof transactionSchema>;

