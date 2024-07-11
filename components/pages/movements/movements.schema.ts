import { z } from 'zod';
import { MovementConcept } from '@prisma/client';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const movementSchema = z.object({
  concept: z.nativeEnum(MovementConcept),
  amount: z.string(),
  date: z.string(),
  userName: z.string(),
});

export type MovementSchema = z.infer<typeof movementSchema>;
