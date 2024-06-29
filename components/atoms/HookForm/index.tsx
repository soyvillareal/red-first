import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

interface FormProps<T extends FieldValues> {
  autoComplete?: string
  onSubmit: SubmitHandler<T>
  methods: UseFormReturn<T>
  className?: string;
  style?: React.CSSProperties
}

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
  )
}

export default HookForm
