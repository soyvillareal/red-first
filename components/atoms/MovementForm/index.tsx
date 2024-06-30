import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/custom/Button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import CalendarIcon from '@/components/icons/CalendarIcon';
import HookForm from '@/components/atoms/HookForm';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import { EMovementType } from '@/lib/types';

import { MovementFormValues } from './MovementForm.types';
import { movementFormSchema } from './MovementForm.schema';
import { defaultValues } from './MovementForm.constants';

export function MovementForm() {
  const { t } = useTranslation();
  const methods = useForm<MovementFormValues>({
    resolver: zodResolver(movementFormSchema),
    defaultValues,
  });

  const onSubmit = useCallback((data: MovementFormValues) => {
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
      <HookForm className='space-y-8' onSubmit={onSubmit} methods={methods}>
        <FormField
          control={methods.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('newMovement.amount')}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Write the amount'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('newMovement.thisAmountRepresentsValue')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='concept'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('newMovement.concept')}</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none font-normal'
                    )}
                    {...field}
                  >
                    {Object.values(EMovementType).map((type) => {
                      return (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription>
                {t('newMovement.theConceptIsUsedToCategorizeIt')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('newMovement.date')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-foreground'
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value).format('MMM D, YYYY')
                      ) : (
                        <span>{t('newMovement.pickDate')}</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('newMovement.dateOfMovementUsedToTrack')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{t('common.enter')}</Button>
      </HookForm>
    </Form>
  );
}
