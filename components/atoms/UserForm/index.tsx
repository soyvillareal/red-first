import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ApolloError, useMutation } from '@apollo/client';

import { EUserRoleRoleNormalized } from '@/types';
import { cn } from '@/lib/utils';
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
import { HookForm } from '@/components/atoms/HookForm';
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon';
import { UserMutation } from '@/lib/apollo';
import { type IUpdateUserArgs } from '@/types/graphql/resolvers';

import { type IUserFormProps, type TUserFormInputs } from './UserForm.types';
import { userFormSchema } from './UserForm.schema';
import { ShowErrors } from '@/components/custom/ShowErrors';

export const UserForm = ({ userId, userData }: IUserFormProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ApolloError>();
  const methods = useForm<TUserFormInputs>({
    resolver: zodResolver(userFormSchema(t)),
    defaultValues: {
      name: userData.name,
      role: userData.role,
    },
  });

  const [updateUser, { loading: userMutationLoading }] = useMutation<
    {
      updateUser: string;
    },
    IUpdateUserArgs
  >(UserMutation);

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
        }
      } catch (error: unknown) {
        if (error instanceof ApolloError) {
          setErrors(error);
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
                    {Object.values(EUserRoleRoleNormalized).map((role) => (
                      <option key={role} value={role}>
                        {t(`roles.${role}`)}
                      </option>
                    ))}
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
      <ShowErrors error={errors} />
    </Form>
  );
};
