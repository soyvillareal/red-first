import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';

import { ContentSectionProps } from './ContentSection.types';

export default function ContentSection({
  title,
  goBackUrl,
  children,
}: ContentSectionProps) {
  return (
    <div className="flex flex-1 flex-col">
      {goBackUrl ? (
        <Link
          className="group flex flex-row justify-start items-center gap-2 hover:underline"
          href={goBackUrl}
        >
          <ChevronLeftIcon className="h-6 w-6 transition-opacity duration-200 delay-150 group-hover:opacity-50" />
          <h3 className="text-lg font-medium">{title}</h3>
        </Link>
      ) : (
        <div className="flex-none">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      <Separator className="my-4 flex-none" />
      <div className="faded-bottom -mx-4 flex-1 overflow-auto scroll-smooth px-4 md:pb-16">
        <div className="lg:max-w-xl">{children}</div>
      </div>
    </div>
  );
}
