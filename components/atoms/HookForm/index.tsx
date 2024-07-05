import { FieldValues, FormProvider } from 'react-hook-form';

import { FormProps } from './HookForm.types';

const HookForm = <T extends FieldValues>({
  autoComplete = 'on',
  onSubmit,
  methods,
  className,
  children,
  style,
}: React.PropsWithChildren<FormProps<T>>) => {
  return (
    <FormProvider {...methods}>
      <form
        className={className}
        autoComplete={autoComplete}
        onSubmit={methods.handleSubmit(onSubmit)}
        style={style}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default HookForm;
