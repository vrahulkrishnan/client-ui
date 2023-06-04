import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';
import * as actions from './actions';

/* --- PROPS --- */

interface AuthPageProps {
  setPageTitle?: any;
  location: any;
}

/* --- STATE --- */
interface AuthState {
  readonly loading: boolean;
  readonly error: string;
  readonly response: any;
  readonly userId: string;
}

interface RegistrationFormTypes {
  firstName: string;
  lastName: string;
  phone: string;
  emailId: string;
  password: string;
  confirmPassword: string;
  hasGivenConsent: boolean;
}
interface LoginFormTypes {
  email: string;
  password: string;
}
/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type AuthManagementProps = AuthPageProps;
type AuthManagementState = AuthState;
type AuthManagementActions = AppActions;

export {
  RootState,
  AuthManagementProps,
  AuthManagementState,
  AuthManagementActions,
  RegistrationFormTypes,
  LoginFormTypes
};
