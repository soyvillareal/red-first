import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { cn } from '@/lib/utils';
import { MovementMutation } from '@/lib/apollo';
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
import { EMovementConcept } from '@/types';

import { MovementFormInputs } from './MovementForm.types';
import { movementFormSchema } from './MovementForm.schema';
import { defaultValues } from './MovementForm.constants';

export function MovementForm() {
  const { t } = useTranslation();

  const methods = useForm<MovementFormInputs>({
    resolver: zodResolver(movementFormSchema(t)),
    defaultValues,
  });

  const [createMovement, { loading: movementMutationLoading }] =
    useMutation(MovementMutation);

  const onSubmit = useCallback(async (data: MovementFormInputs) => {
    try {
      const createdMovement = await createMovement({
        variables: {
          concept: data.concept,
          amount: data.amount,
          date: dayjs(data.date).format('YYYY-MM-DD'),
        },
      });

      toast({
        description: t(`responseCodes.${createdMovement.data.createMovement}`),
      });
    } catch (error: any) {
      toast({
        description: t(`responseCodes.${error.message}`),
      });
    }
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
                <Input type='number' placeholder='0' {...field} />
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
                    {Object.values(EMovementConcept).map((concept) => {
                      return (
                        <option key={concept} value={concept}>
                          {t(`newMovement.${concept}`)}
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
        <Button type='submit' loading={movementMutationLoading}>
          {t('common.enter')}
        </Button>
      </HookForm>
    </Form>
  );
}
