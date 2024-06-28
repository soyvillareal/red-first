import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  concept: z.string(),
  quantity: z.string(),
  date: z.string(),
  userName: z.string(),
})

export type Task = z.infer<typeof taskSchema>
