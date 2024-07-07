import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'next-i18next';

import { toast } from '@/components/ui/use-toast';
import { findGraphQLErrors } from '@/lib/utils';

import { IShowErrorsProps } from './ShowErrors.types';

export const ShowErrors = ({ error }: IShowErrorsProps): null => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (error) {
      const errorsMessage = findGraphQLErrors(error);

      toast({
        description: (
          <div>
            <p className="pb-1">{t('common.errorOccurred')}</p>
            <ul>
              {errorsMessage.map((message, i) => (
                <li key={uuid()}>
                  {i + 1}:{' '}
                  {i18n.exists(`responseCodes.${message}`)
                    ? t(`responseCodes.${message}`)
                    : message}
                </li>
              ))}
            </ul>
          </div>
        ),
        variant: 'destructive',
      });
    }
  }, [t, error, i18n]);

  return null;
};
