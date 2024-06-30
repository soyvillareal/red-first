import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { EUserRole } from '@/lib/types';

import { UserFormValues } from './UserForm.types';
import { userFormSchema } from './UserForm.schema';
import { defaultValues } from './UserForm.constants';

export function UserForm() {
  const { t } = useTranslation();
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const onSubmit = useCallback((data: UserFormValues) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }, []);

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
                    {Object.values(EUserRole).map((type) => {
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
        <Button type='submit'>{t('common.save')}</Button>
      </HookForm>
    </Form>
  );
}
