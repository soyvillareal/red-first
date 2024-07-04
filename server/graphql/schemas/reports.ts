import { MovementConcept } from '@prisma/client';
import { Field, ObjectType } from 'type-graphql';

import {
  type IGetAdditionalMovements,
  type IGetRecentMovements,
  type IGetMovementsChart,
  type TValidMonthsKeys,
} from '@/types/graphql/resolvers';

@ObjectType()
export class MovementsChart implements IGetMovementsChart {
  @Field(() => String)
  name: TValidMonthsKeys;

  @Field(() => String)
  income: string;

  @Field(() => String)
  expense: string;
}

@ObjectType()
export class GetRecentMovements implements IGetRecentMovements {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  movement: string;

  @Field(() => MovementConcept)
  concept: MovementConcept;
}

@ObjectType()
export class GetAditionalMovements implements IGetAdditionalMovements {
  @Field(() => String)
  balance: string;

  @Field(() => Number)
  movements: number;

  @Field(() => [GetRecentMovements])
  recentMovements: IGetRecentMovements[];
}
