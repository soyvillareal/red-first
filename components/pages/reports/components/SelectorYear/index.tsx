import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ISelectorYearProps } from './SelectorYear.types';

const SelectorYear = ({
  yearsData,
  value,
  onValueChange,
}: ISelectorYearProps) => {
  return (
    yearsData && (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-accent w-[80px] h-8 mt-[0px!important]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent side="top">
          {yearsData.map((year) => (
            <SelectItem className="cursor-pointer" key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  );
};

export default SelectorYear;
