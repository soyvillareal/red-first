import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const movementSchema = z.object({
  concept: z.string(),
  amount: z.string(),
  date: z.string(),
  userName: z.string(),
})

export type movementSchema = z.infer<typeof movementSchema>
