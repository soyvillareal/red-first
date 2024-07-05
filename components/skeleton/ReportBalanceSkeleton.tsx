import { Skeleton } from '@/components/ui/skeleton';

export const ReportBalanceSkeleton = () => (
  <div className="flex items-center gap-2">
    <span className="text-secondary-foreground text-2xl font-bold">$</span>
    <Skeleton className="w-80 h-6 rounded-[4px]" />
  </div>
);
