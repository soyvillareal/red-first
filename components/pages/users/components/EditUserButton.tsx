import { useRouter } from 'next/router';

import { routes } from '@/lib/contants';
import { Button } from '@/components/custom/Button';
import { EditIcon } from '@/components/icons/EditIcon';
import { IEditUserButtonProps } from './components.types';

const EditUserButton = ({ userId }: IEditUserButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${routes.editUser}/${userId}`);
  };

  return (
    <Button
      variant="ghost"
      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      onClick={handleClick}
    >
      <EditIcon />
      <span className="sr-only">Open menu</span>
    </Button>
  );
};

export default EditUserButton;
