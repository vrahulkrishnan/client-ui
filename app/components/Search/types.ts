import { TextInputProps } from '@mantine/core';

export interface SearchProps extends TextInputProps {
  value: string;
  placeholder?: string;
  onClear: () => void;
}
