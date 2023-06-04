import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, DropdownAPIOption, DropdownOption, ServerFileType } from '../../types';
import * as actions from './actions';

/* --- PROPS --- */

interface RestaurantProps {
  readonly setPageTitle?: any;
}

/* --- STATE --- */
interface RestaurantState {
  readonly loading: boolean;
  readonly activities: IActivity[];
  readonly restaurants: IRestaurant[];
  readonly restaurant: IRestaurant;
}

export interface IActivity {
  id: string;
  mainImage: ServerFileType;
  title: string;
  description: string;
  restaurant: DropdownOption;
  galleryImages: ServerFileType[];
}

export interface IActivityResponse {
  id: string;
  images: ServerFileType[];
  title: string;
  description: string;
  restaurant: DropdownAPIOption;
}

export interface IRestaurant {
  id: string;
  images: ServerFileType[];
  mainImage: ServerFileType;
  name: string;
  description: string;
  galleryImages: ServerFileType[];
}

export interface IRestaurantResponse {
  id: string;
  images: ServerFileType[];
  name: string;
  description: string;
}

/* --- ACTIONS --- */
type RestaurantActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type RestaurantManagementProps = RestaurantProps;
type RestaurantManagementState = RestaurantState;
type RestaurantManagementActions = RestaurantActions;

export { RootState, RestaurantManagementProps, RestaurantManagementState, RestaurantManagementActions };
