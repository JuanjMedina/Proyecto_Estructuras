import { z } from 'zod'
const personSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  age: z.number().int().min(18).max(100),
  isSubscribed: z.boolean(),
  isVerified: z.boolean(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable()
})

export function validateMovie (input: any): any {
  return personSchema.safeParse(input)
}
