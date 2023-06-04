import { Reducer, Store } from 'redux';
import { Saga } from '@redux-saga/types';
import { RouterState } from 'connected-react-router';
import { AppManagementState as AppState } from 'pages/AppManagement/types';
import { AuthManagementState as AuthState } from 'pages/AuthManagement/types';
import { HomeManagementState as HomeState } from 'pages/HomeManagement/types';
import { ProfileManagementState as ProfileState } from 'pages/ProfileManagement/types';
import { ActivityManagementState as ActivityState } from 'pages/ActivityManagement/types';
import { RestaurantManagementState as RestaurantState } from 'pages/RestaurantManagement/types';
import { WelcomeManagementState as WelcomeState } from 'pages/WelcomePageManagement/types';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga | (() => IterableIterator<any>) | undefined, args: any | undefined): any;
}
export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

export interface RequestSagaParams {
  type: string;
  payload: any;
  meta?: any;
  error?: any;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownAPIOption {
  id: number;
  name: string;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly app: AppState;
  readonly auth: AuthState;
  readonly home: HomeState;
  readonly profile: ProfileState;
  readonly activity: ActivityState;
  readonly restaurant: RestaurantState;
  readonly welcome: WelcomeState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly

  // for testing purposes
  readonly test: any;
}

export declare interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export { InteractiveElementProps, NavigationElementProps, AnchorElementProps } from './interactive-element';
export { Omit } from './omit';
export interface ServerFileType {
  id: string;
  imageUrl: string;
  isMainImage: boolean;
  fileName: string;
  serverFileName: string;
}

export interface IUserDetails {
  id: number;
  emailId: string;
  firstName: string;
  lastName: string;
  phone: string;
  image?: any;
  city?: string;
  country?: string;
  participatedActivityPercent?: number;
}
