import { PhoneInputProps } from 'react-phone-input-2';

export interface TelFieldProps extends Omit<PhoneInputProps, 'onChange'> {
  name: string;
  required?: boolean;
  onChange: (value, event) => void;
}
