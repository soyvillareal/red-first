import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserRole } from '@prisma/client';
import { useMutation } from '@apollo/client';

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
import HookForm from '@/components/atoms/HookForm';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { UserMutation } from '@/lib/apollo';
import { type IUpdateUserArgs } from '@/types/graphql/resolvers';

import { type IUserFormProps, type TUserFormInputs } from './UserForm.types';
import { userFormSchema } from './UserForm.schema';

export function UserForm({ userId, userData }: IUserFormProps) {
  const { t } = useTranslation();
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

        toast({
          description: t(`responseCodes.${updatedUser.data?.updateUser}`),
        });
      } catch (error: any) {
        toast({
          description: t(`responseCodes.${error.message}`),
        });
      }
    },
    [userData]
  );

  return (
    <Form {...methods}>
      <HookForm className='space-y-5' onSubmit={onSubmit} methods={methods}>
        <FormField
          control={methods.control}
          name='name'
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
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('editUser.role')}</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none font-normal'
                    )}
                    {...field}
                  >
                    {Object.values(UserRole).map((type) => {
                      return (
                        <option key={type} value={type}>
                          {t(`roles.${type}`)}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription className='text-red'>
                {t('editUser.roleOfTheUser')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' loading={userMutationLoading}>
          {t('common.save')}
        </Button>
      </HookForm>
    </Form>
  );
}
