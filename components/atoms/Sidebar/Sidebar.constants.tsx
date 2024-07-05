import { TFunction } from 'next-i18next';

import { routes } from '@/lib/contants';
import { SideLink } from '@/components/atoms/Nav/Nav.types';
import { IncomeIcon } from '@/components/icons/IncomeIcon';
import { LayoutDashboardIcon } from '@/components/icons/LayoutDashboardIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';

export const sidelinks = (t: TFunction): SideLink[] => [
  {
    title: t('sidebar.reports'),
    label: '',
    href: routes.reports,
    icon: <LayoutDashboardIcon width={18} />,
  },
  {
    title: t('sidebar.incomeAndExpenses'),
    label: '',
    href: routes.movements,
    icon: <IncomeIcon width={18} />,
  },
  {
    title: t('sidebar.users'),
    label: '',
    href: routes.users,
    icon: <UsersIcon width={18} />,
  },
];
