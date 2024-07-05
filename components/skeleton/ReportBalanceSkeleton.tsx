import { Skeleton } from '../ui/skeleton';

const ReportBalanceSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-secondary-foreground text-2xl font-bold">$</span>
      <Skeleton className="w-80 h-6 rounded-[4px]" />
    </div>
  );
};

export default ReportBalanceSkeleton;
