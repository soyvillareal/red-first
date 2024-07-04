import { useQuery } from '@apollo/client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ValidYearsQuery } from '@/lib/apollo';

import { ISelectorYearProps } from './SelectorYear.types';
import { Skeleton } from '@/components/ui/skeleton';

const SelectorYear = ({ value, onValueChange }: ISelectorYearProps) => {
  const {
    data: additionalMovementQueryData,
    loading: additionalMovementQueryLoading,
  } = useQuery<{
    getValidYears: string[];
  }>(ValidYearsQuery);

  return additionalMovementQueryLoading ? (
    <Skeleton className='w-[80px] h-8 rounded-[4px] mt-[0px!important]' />
  ) : (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className='bg-accent w-[80px] h-8 mt-[0px!important]'>
        <SelectValue placeholder='Select year' />
      </SelectTrigger>
      <SelectContent side='top'>
        {additionalMovementQueryData?.getValidYears.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectorYear;
