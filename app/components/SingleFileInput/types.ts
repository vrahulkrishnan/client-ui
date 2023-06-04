import { FileButtonProps } from '@mantine/core';
import { ServerFileType } from 'types';
import { iconMapKeys } from '.icons';

export interface SingleFileInputProps extends Omit<FileButtonProps, 'children'> {
  label: string;
  icon?: iconMapKeys;
  value: File | ServerFileType | null;
  onClose?: (item: File | null) => void;
}
