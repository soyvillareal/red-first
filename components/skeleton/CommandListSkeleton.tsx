import { v4 as uuid } from 'uuid';

import { CommandGroup, CommandItem } from '@/components//ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { fillArray } from '@/lib/utils';

const CommandListSkeleton = () => {
  return (
    <CommandGroup>
      {fillArray(3).map(() => (
        <CommandItem key={uuid()}>
          <Skeleton className="w-full h-5 rounded-[8px]" />
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

export default CommandListSkeleton;
