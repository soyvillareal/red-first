import { Field, ObjectType } from 'type-graphql';

import {
  type IFindUserByNameOrEmail,
  type IGetUsers,
} from '@/types/graphql/resolvers';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';

import { PageOptionsMeta } from './pagination';

@ObjectType('GetUsers')
export class GetUsers implements IGetUsers {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;
}

@ObjectType('PaginatedUsers')
export class PaginatedUsers
  extends PageOptionsMeta
  implements IPageOptionsDataMeta<IGetUsers[]>
{
  @Field(() => [GetUsers], { nullable: true })
  data: IGetUsers[];
}

@ObjectType('FindUserByNameOrEmail')
export class FindUserByNameOrEmail implements IFindUserByNameOrEmail {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
