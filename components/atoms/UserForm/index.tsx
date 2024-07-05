import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ApolloError, useApolloClient, useMutation } from '@apollo/client';

import { EUserRoleRoleNormalized } from '@/types';
import { cn, findQueryVariables } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/custom/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import HookForm from '@/components/atoms/HookForm';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { UserMutation, UsersQuery } from '@/lib/apollo';
import {
  type IUpdateUserArgs,
  TValidsUserTypes,
} from '@/types/graphql/resolvers';
import { IPaginationArgs } from '@/types/graphql/pagination';

import { type IUserFormProps, type TUserFormInputs } from './UserForm.types';
import { userFormSchema } from './UserForm.schema';

export function UserForm({ userId, userData }: IUserFormProps) {
  const { t } = useTranslation();
  const client = useApolloClient();
  const methods = useForm<TUserFormInputs>({
    resolver: zodResolver(userFormSchema(t)),
    defaultValues: {
      name: userData.name,
      role: userData.role,
    },
  });

  const usersLastVariables = findQueryVariables<
    IPaginationArgs<TValidsUserTypes>
  >(client, UsersQuery, 'pagination');

  const [updateUser, { loading: userMutationLoading }] = useMutation<
    {
      updateUser: string;
    },
    IUpdateUserArgs
  >(UserMutation, {
    refetchQueries: [
      {
        query: UsersQuery,
        variables: usersLastVariables,
      },
    ],
  });

  const onSubmit = useCallback(
    async (data: TUserFormInputs) => {
      try {
        const updatedUser = await updateUser({
          variables: {
            userId,
            name: data.name,
            role: data.role,
          },
        });

        if (updatedUser.data?.updateUser) {
          toast({
            description: t(`responseCodes.${updatedUser.data?.updateUser}`),
          });
        } else {
          toast({
            description: t('responseCodes.SOMETHING_WENT_WRONG'),
            variant: 'destructive',
          });
        }
      } catch (error: unknown) {
        if (error instanceof ApolloError) {
          toast({
            description: t(`responseCodes.${error.message}`),
            variant: 'destructive',
          });
        } else {
          toast({
            description: t('responseCodes.SOMETHING_WENT_WRONG'),
            variant: 'destructive',
          });
        }
      }
    },
    [updateUser, t, userId],
  );

  return (
    <Form {...methods}>
      <HookForm className="space-y-5" onSubmit={onSubmit} methods={methods}>
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('editUser.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('editUser.writeName')} {...field} />
              </FormControl>
              <FormDescription>
                {t('editUser.nameOfTheUserToEdentifyIt')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('editUser.role')}</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none font-normal',
                    )}
                    {...field}
                  >
                    {Object.values(EUserRoleRoleNormalized).map((role) => {
                      return (
                        <option key={role} value={role}>
                          {t(`roles.${role}`)}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormDescription className="text-red">
                {t('editUser.roleOfTheUser')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={userMutationLoading}>
          {t('common.save')}
        </Button>
      </HookForm>
    </Form>
  );
}
