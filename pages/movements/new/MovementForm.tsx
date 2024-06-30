import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const accountFormSchema = z.object({
  amount: z
    .number()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  concept: z.nativeEnum(EMovementType, {
    required_error: 'Please select a valid concept.',
  }),
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  amount: 0,
  concept: EMovementType.INCOME,
  date: new Date(),
};

export function MovementForm() {
  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...methods}>
      <HookForm className='space-y-8' onSubmit={onSubmit} methods={methods}>
        <FormField
          control={methods.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Write the amount'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This amount represents the value of the movement.
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
              <FormLabel>Concept</FormLabel>
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
                The concept of the movement is used to categorize it.
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
              <FormLabel>Date</FormLabel>
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
                        <span>Pick a date</span>
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
                The date of movement is used to track when it happened.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Generar movimiento</Button>
      </HookForm>
    </Form>
  );
}
