import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  hashed_password: z.string(),
})

export type User = z.infer<typeof userSchema>;

