import { useTranslation } from 'next-i18next';

import { cn, getNameInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecentMovementsSkeleton } from '@/components/skeleton/RecentMovementsSkeleton';

import { IRecentMovementsProps } from './RecentMovements.types';
import { useCallback } from 'react';

const RecentMovements = ({
  isLoading,
  error,
  movements,
}: IRecentMovementsProps) => {
  const { t } = useTranslation();

  const renderData = useCallback(() => {
    return isLoading ? (
      <RecentMovementsSkeleton />
    ) : (
      movements?.map((movement) => (
        <div key={movement.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={movement.image} alt={t('common.avatar')} />
            <AvatarFallback>{getNameInitials(movement.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-secondary-foreground text-sm font-medium leading-none">
              {movement.name}
            </p>
            <p className="text-secondary-foreground text-sm text-muted-foreground">
              {movement.email}
            </p>
          </div>
          <div
            className={cn(
              'text-secondary-foreground ml-auto font-medium',
              movement.concept === 'income' ? 'text-green' : 'text-red',
            )}
          >
            {movement.movement}
          </div>
        </div>
      ))
    );
  }, [t, isLoading, movements]);

  return (
    <div className="space-y-8 h-full">
      {error ? (
        <p className="flex items-center justify-center h-full text-gray-500">
          {t('responseCodes.MOVEMENTS_NOT_FOUND')}
        </p>
      ) : (
        renderData()
      )}
    </div>
  );
};

export default RecentMovements;
