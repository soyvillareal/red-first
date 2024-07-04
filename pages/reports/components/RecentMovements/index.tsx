import { useTranslation } from 'next-i18next';
import { useQuery } from '@apollo/client';

import { cn, fillArray, getNameInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IRecentMovementsProps } from './RecentMovements.types';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentMovements({
  isLoading,
  movements,
}: IRecentMovementsProps) {
  const { t } = useTranslation();

  return isLoading ? (
    <div className='space-y-8'>
      {fillArray(5).map((_, index) => (
        <div key={index} className='flex items-center'>
          <Skeleton className='h-9 w-9 rounded-full' />
          <div className='ml-4 space-y-1'>
            <Skeleton className='w-20 h-3' />
            <Skeleton className='w-36 h-3' />
          </div>
          <Skeleton className='ml-auto w-24 h-3' />
        </div>
      ))}
    </div>
  ) : (
    <div className='space-y-8'>
      {movements?.map((movement) => (
        <div key={movement.id} className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={movement.image} alt={t('common.avatar')} />
            <AvatarFallback>{getNameInitials(movement.name)}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-secondary-foreground text-sm font-medium leading-none'>
              {movement.name}
            </p>
            <p className='text-secondary-foreground text-sm text-muted-foreground'>
              {movement.email}
            </p>
          </div>
          <div
            className={cn(
              'text-secondary-foreground ml-auto font-medium',
              movement.concept === 'income' ? 'text-green' : 'text-red'
            )}
          >
            {movement.movement}
          </div>
        </div>
      ))}
    </div>
  );
}
