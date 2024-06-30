import { SideLink } from '../Nav/Nav.types';
import IncomeIcon from '../../icons/IncomeIcon';
import LayoutDashboardIcon from '../../icons/LayoutDashboardIcon';
import UsersIcon from '../../icons/UsersIcon';
import { routes } from '@/lib/contants';

export const sidelinks: SideLink[] = [
  {
    title: 'Reportes',
    label: '',
    href: routes.reports,
    icon: <LayoutDashboardIcon width={18} />,
  },
  {
    title: 'Ingresos y egresos',
    label: '',
    href: routes.movements,
    icon: <IncomeIcon width={18} />,
  },
  {
    title: 'Usuarios',
    label: '',
    href: routes.users,
    icon: <UsersIcon width={18} />,
  },
];
