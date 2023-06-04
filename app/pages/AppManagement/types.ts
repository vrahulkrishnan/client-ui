import { ActionType } from 'typesafe-actions';
import { ApplicationRootState, IUserDetails } from '../../types';
import * as actions from './actions';

/* --- PROPS --- */

interface AppProps {
  readonly location?: { pathname?: string };
}

interface IStatusMessage {
  message: string;
  type?: ColorTypes;
}

type ColorTypes = 'info' | 'warning' | 'danger' | 'success';

/* --- STATE --- */
interface AppState {
  readonly loading: boolean;
  readonly userDetails: IUserDetails;
  readonly showStatus: boolean;
  readonly status: IStatusMessage;
}

interface IStatusMessage {
  message: string;
  type?: ColorTypes;
}
/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type AppManagementProps = AppProps;
type AppManagementState = AppState;
type AppManagementActions = AppActions;

export { RootState, AppManagementProps, AppManagementState, AppManagementActions, IStatusMessage };
