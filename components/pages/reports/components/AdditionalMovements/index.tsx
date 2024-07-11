import { useTranslation } from 'next-i18next';

import { cn } from '@/lib/utils';
import { Dollar2Icon } from '@/components/icons/Dollar2Icon';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RecentMovements from '@/components/pages/reports/components/RecentMovements';
import { IAdditionalMovementsProps } from './AdditionalMovements.types';

const AdditionalMovements = ({
  data: additionalMovementData,
}: IAdditionalMovementsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <Card className="mb-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            {t('dashboard.balance')}
          </CardTitle>
          <Dollar2Icon className="h-4 w-4 text-secondary-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'text-secondary-foreground text-2xl font-bold',
              additionalMovementData?.balance.includes('-')
                ? 'text-red'
                : 'text-green',
            )}
          >
            {additionalMovementData?.balance ?? '$ 0.00'}
          </div>
        </CardContent>
      </Card>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">
            {t('dashboard.recentMovements')}
          </CardTitle>
          <CardDescription className="text-secondary-foreground">
            {t('dashboard.youMadeMovementsMonth', {
              replace: {
                movements: additionalMovementData?.movements ?? '$ 0.00',
              },
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <RecentMovements
            movements={additionalMovementData?.recentMovements}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalMovements;
