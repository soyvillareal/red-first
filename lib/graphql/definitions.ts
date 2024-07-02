import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import { MovementConcept, Movements, User } from '@prisma/client';
import {
  ICreateMovementArgs,
  IGetMovements,
  IGetMovementsWithTotal,
} from '@/types/graphql/resolvers';

registerEnumType(MovementConcept, {
  name: 'EMovementConcept',
  description: 'Movements types',
  valuesConfig: {
    expense: { description: 'Expense' },
    income: { description: 'Income' },
  },
});

@InputType()
export class CreateMovementArgs implements ICreateMovementArgs {
  @Field(() => MovementConcept)
  concept: MovementConcept;

  @Field(() => String)
  amount: string;

  @Field(() => String)
  date: string;
}

@ObjectType()
export class GetMovements implements IGetMovements {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userName: string;

  @Field(() => String)
  amount: string;

  @Field(() => MovementConcept)
  concept: MovementConcept;

  @Field(() => String)
  date: string;
}

@ObjectType()
export class GetMovementsWithTotal implements IGetMovementsWithTotal {
  @Field(() => [GetMovements])
  movements: GetMovements[];

  @Field(() => Number)
  total: number;
}
