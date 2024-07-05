import { Field, InputType, ObjectType } from 'type-graphql';
import { MovementConcept } from '@prisma/client';

import {
  type ICreateMovementArgs,
  type IGetMovements,
  type IGetMovementsWithTotal,
} from '@/types/graphql/resolvers';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';

import { PageOptionsMeta } from './pagination';

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

  @Field(() => String)
  total: string;
}

@ObjectType()
export class PaginatedMovements
  extends PageOptionsMeta
  implements IPageOptionsDataMeta<IGetMovementsWithTotal>
{
  @Field(() => GetMovementsWithTotal, { nullable: true })
  data: IGetMovementsWithTotal;
}
