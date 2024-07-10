import { LogoIcon } from '@/components/icons/LogoIcon';
import { UserNav } from '@/components/atoms/UserNav';

export const Navbar = () => (
  <nav className="relative container mx-auto p-6">
    <div className="flex items-center justify-between">
      <LogoIcon className="w-[150px] sm:w-[300px]" />
      <UserNav />
    </div>
  </nav>
);
