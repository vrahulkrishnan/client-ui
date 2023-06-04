import { iconMapKeys } from '../../.icons';

export interface NavbarLinkProps {
  icon: iconMapKeys;
  label: string;
  active?: boolean;
  onClick?(): void;
  link?: string;
}
