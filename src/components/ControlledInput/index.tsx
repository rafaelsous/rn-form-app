import { Control, Controller, FieldError } from 'react-hook-form';

import { Input, InputProps } from '../Input';
import { Error } from './styles';

interface ControlledInputProps extends InputProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export function ControlledInput({ name, control, error, ...rest }: ControlledInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />

          {error && (
            <Error>
              {error.message}
            </Error>
          )}
        </>
      )}
    />
  );
}