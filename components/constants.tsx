import IncomeIcon from './icons/IncomeIcon';
import LayoutDashboardIcon from './icons/LayoutDashboardIcon';
import UsersIcon from './icons/UsersIcon';
import { SideLink } from './types';

export const sidelinks: SideLink[] = [
  {
    title: 'Reportes',
    label: '',
    href: '/reports',
    icon: <LayoutDashboardIcon width={18} />,
  },
  {
    title: 'Ingresos y egresos',
    label: '',
    href: '/movements',
    icon: <IncomeIcon width={18} />,
  },
  {
    title: 'Usuarios',
    label: '',
    href: '/users',
    icon: <UsersIcon width={18} />,
  },
];
