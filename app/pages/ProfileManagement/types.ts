import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, DropdownOption, ServerFileType } from '../../types';
import * as actions from './actions';

/* --- PROPS --- */

interface ProfileProps {
  readonly setPageTitle?: any;
}

/* --- STATE --- */
interface ProfileState {
  readonly loading: boolean;
  readonly activities: IActivity[];
  readonly restaurants: DropdownOption[];
  readonly response: string;
  readonly error: string;
}

export interface IActivity {
  id: string;
  title: string;
  status: string;
  description: string;
  image: ServerFileType;
}

export interface IActivityResponse {
  activity: { id: string; title: string; description: string };
  image: ServerFileType;
  status: string;
}

/* --- ACTIONS --- */
type ProfileActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ProfileManagementProps = ProfileProps;
type ProfileManagementState = ProfileState;
type ProfileManagementActions = ProfileActions;

export { RootState, ProfileManagementProps, ProfileManagementState, ProfileManagementActions };
