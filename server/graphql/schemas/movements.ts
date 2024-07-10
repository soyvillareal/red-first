import { Field, InputType, ObjectType } from 'type-graphql';
import { MovementConcept } from '@prisma/client';

import {
  type IGetMovements,
  type IGetMovementsWithTotal,
  type IPaginationMovementsArgs,
} from '@/types/graphql/resolvers';
import {
  type IPageOptionsDataMeta,
  type TPageOrder,
} from '@/types/graphql/pagination';

import { PageOptionsMeta } from './pagination';

@ObjectType('GetMovements')
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

@ObjectType('GetMovementsWithTotal')
export class GetMovementsWithTotal implements IGetMovementsWithTotal {
  @Field(() => [GetMovements])
  movements: GetMovements[];

  @Field(() => String)
  total: string;
}

@ObjectType('PaginatedMovements')
export class PaginatedMovements
  extends PageOptionsMeta
  implements IPageOptionsDataMeta<IGetMovementsWithTotal>
{
  @Field(() => GetMovementsWithTotal, { nullable: true })
  data: IGetMovementsWithTotal;
}

@InputType('PaginationMovementsArgs')
export class PaginationMovementsArgs implements IPaginationMovementsArgs {
  @Field(() => Number)
  page: number;

  @Field(() => Number, { defaultValue: 10 })
  limit: number;

  @Field(() => String, { defaultValue: 'asc' })
  order: TPageOrder;

  @Field(() => String, { nullable: true })
  filterType: string | null;

  @Field(() => String, { nullable: true })
  userId: string | null;

  @Field(() => String)
  fieldOrder: string;
}
