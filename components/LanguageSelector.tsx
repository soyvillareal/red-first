import { useTranslation } from 'next-i18next';
import i18nConfig from '@/lib/i18nConfig';
import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);

    const newPathname = `/${value}${pathname}`;

    router.push({ pathname: newPathname, query }, asPath, {
      locale: value,
      scroll: false,
    });
  };

  return (
    <div>
      <Select onValueChange={changeLanguage} value={i18n.language}>
        <SelectTrigger className='w-[75px]'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent className='bg-background'>
          {i18nConfig.languages.map((lng, i) => (
            <SelectItem className=' text-secondary-foreground' key={i} value={lng}>
              {lng}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
