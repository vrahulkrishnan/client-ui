import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, DropdownAPIOption, DropdownOption, ServerFileType } from '../../types';
import * as actions from './actions';

/* --- PROPS --- */

interface ActivityProps {
  readonly setPageTitle?: any;
}

/* --- STATE --- */
interface ActivityState {
  readonly loading: boolean;
  readonly activities: IActivity[];
  readonly restaurants: DropdownOption[];
  readonly activity: IActivity;
}

export interface IActivity {
  id: string;
  mainImage: ServerFileType;
  title: string;
  description: string;
  restaurant: DropdownOption;
  galleryImages: ServerFileType[];
  progress: 'todo' | 'pending' | 'approved' | 'rejected';
}

export interface ActivityFormTypes {
  id?: string;
  title: string;
  restaurant: DropdownOption;
  description: string;
  mainImage: ServerFileType | null;
  galleryImages: ServerFileType[];
  progress: 'todo' | 'pending' | 'approved' | 'rejected';
}
export interface StampFormTypes {
  id?: string;
  activity: string;
  restaurant: string;
  image: File | null;
}

export interface IActivityResponse {
  id: string;
  images: ServerFileType[];
  title: string;
  description: string;
  restaurant: DropdownAPIOption;
  progress?: 'not participated' | 'pending' | 'approved' | 'rejected';
}

/* --- ACTIONS --- */
type ActivityActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ActivityManagementProps = ActivityProps;
type ActivityManagementState = ActivityState;
type ActivityManagementActions = ActivityActions;

export { RootState, ActivityManagementProps, ActivityManagementState, ActivityManagementActions };
