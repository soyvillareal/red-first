import { MovementConcept } from '@prisma/client';
import { Field, ObjectType } from 'type-graphql';

import {
  type IGetMovementsChart,
  type IGetRecentMovements,
  type TValidMonthsKeys,
} from '@/types/graphql/resolvers';

@ObjectType('MovementsChart')
export class MovementsChart implements IGetMovementsChart {
  @Field(() => String)
  name: TValidMonthsKeys;

  @Field(() => String)
  income: string;

  @Field(() => String)
  expense: string;
}

@ObjectType('GetRecentMovements')
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
