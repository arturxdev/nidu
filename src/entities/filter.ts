import { z } from "zod";

export const FilterSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(0),
  order: z.string().optional().default('desc'),
  dateStart: z.coerce.date().optional(),
  dateEnd: z.coerce.date().optional(),
})

export type Filter = z.infer<typeof FilterSchema>;
