import { ApplicationRootState } from 'types';

/* --- PROPS --- */

interface WelcomePageProps {
  setPageTitle?: any;
}

/* --- STATE --- */
interface WelcomeState {
  readonly loading: boolean;
  readonly error: string;
  readonly response: string;
}

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type WelcomeManagementProps = WelcomePageProps;
type WelcomeManagementState = WelcomeState;

export { RootState, WelcomeManagementProps, WelcomeManagementState };
