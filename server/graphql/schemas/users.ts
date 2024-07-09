import { Field, ObjectType, registerEnumType } from 'type-graphql';

import { EUserRoleRoleNormalized } from '@/types';
import {
  IFindUserByNameOrEmail,
  type IGetUsers,
} from '@/types/graphql/resolvers';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';

import { PageOptionsMeta } from './pagination';

registerEnumType(EUserRoleRoleNormalized, {
  name: 'EUserRole',
  description: 'User roles',
  valuesConfig: {
    admin: { description: 'Administrator' },
    user: { description: 'User' },
  },
});

@ObjectType()
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

@ObjectType()
export class PaginatedUsers
  extends PageOptionsMeta
  implements IPageOptionsDataMeta<IGetUsers[]>
{
  @Field(() => [GetUsers], { nullable: true })
  data: IGetUsers[];
}

@ObjectType()
export class FindUserByNameOrEmail implements IFindUserByNameOrEmail {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
