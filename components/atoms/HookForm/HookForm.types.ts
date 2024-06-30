import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
  autoComplete?: string;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
  className?: string;
  style?: React.CSSProperties;
}
