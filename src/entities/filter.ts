import { z } from "zod";

export const FilterSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(0),
  order: z.coerce.string().optional().default("desc"),
  dateStart: z.coerce.date().nullish(),
  dateEnd: z.coerce.date().nullish(),
});

export type Filter = z.infer<typeof FilterSchema>;
