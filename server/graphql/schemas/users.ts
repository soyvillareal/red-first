import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import { UserRole } from '@prisma/client';

import {
  type IUpdateUserArgs,
  type IGetUsers,
} from '@/types/graphql/resolvers';
import { type IPageOptionsDataMeta } from '@/types/graphql/pagination';

import { PageOptionsMeta } from './pagination';

registerEnumType(UserRole, {
  name: 'EUserRole',
  description: 'User roles',
  valuesConfig: {
    admin: { description: 'Administrator' },
    user: { description: 'User' },
  },
});

@InputType()
export class UpdateUserArgs implements IUpdateUserArgs {
  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String)
  name: string;

  @Field(() => UserRole)
  role: UserRole;
}

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
