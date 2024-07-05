import { TFunction } from 'next-i18next';

import { routes } from '@/lib/contants';

import { SideLink } from '../Nav/Nav.types';
import IncomeIcon from '../../icons/IncomeIcon';
import LayoutDashboardIcon from '../../icons/LayoutDashboardIcon';
import UsersIcon from '../../icons/UsersIcon';

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
