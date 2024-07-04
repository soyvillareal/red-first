import { Skeleton } from '../ui/skeleton';

const ReportMovementsSkeleton = () => {
  return (
    <div className='flex items-center'>
      <Skeleton className='w-80 h-4 rounded-[2px]' />
    </div>
  );
};

export default ReportMovementsSkeleton;
