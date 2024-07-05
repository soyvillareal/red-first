import LogoIcon from '@/components/icons/LogoIcon';
import { UserNav } from '@/components/atoms/UserNav';

const Navbar = () => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="pt-2">
          <LogoIcon className="sm:w-[300px]" />
        </div>
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
