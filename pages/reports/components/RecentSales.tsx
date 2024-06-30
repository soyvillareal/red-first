import { useTranslation } from 'next-i18next';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  const { t } = useTranslation();

  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt={t('common.avatar')} />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-secondary-foreground text-sm font-medium leading-none'>
            Olivia Martin
          </p>
          <p className='text-secondary-foreground text-sm text-muted-foreground'>
            olivia.martin@email.com
          </p>
        </div>
        <div className='text-secondary-foreground ml-auto font-medium'>
          +$1,999.00
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt={t('common.avatar')} />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-secondary-foreground text-sm font-medium leading-none'>
            Jackson Lee
          </p>
          <p className='text-secondary-foreground text-sm text-muted-foreground'>
            jackson.lee@email.com
          </p>
        </div>
        <div className='text-secondary-foreground ml-auto font-medium'>
          +$39.00
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt={t('common.avatar')} />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-secondary-foreground text-sm font-medium leading-none'>
            Isabella Nguyen
          </p>
          <p className='text-secondary-foreground text-sm text-muted-foreground'>
            isabella.nguyen@email.com
          </p>
        </div>
        <div className='text-secondary-foreground ml-auto font-medium'>
          +$299.00
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt={t('common.avatar')} />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-secondary-foreground text-sm font-medium leading-none'>
            William Kim
          </p>
          <p className='text-secondary-foreground text-sm text-muted-foreground'>
            will@email.com
          </p>
        </div>
        <div className='text-secondary-foreground ml-auto font-medium'>
          +$99.00
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt={t('common.avatar')} />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-secondary-foreground text-sm font-medium leading-none'>
            Sofia Davis
          </p>
          <p className='text-secondary-foreground text-sm text-muted-foreground'>
            sofia.davis@email.com
          </p>
        </div>
        <div className='text-secondary-foreground ml-auto font-medium'>
          +$39.00
        </div>
      </div>
    </div>
  );
}
