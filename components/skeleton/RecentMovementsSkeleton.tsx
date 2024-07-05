import { fillArray } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export const RecentMovementsSkeleton = () =>
  fillArray(5).map((item) => (
    <div key={item} className="flex items-center">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="ml-4 space-y-1">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-36 h-3" />
      </div>
      <Skeleton className="ml-auto w-24 h-3" />
    </div>
  ));
