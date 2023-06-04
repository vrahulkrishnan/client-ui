import { IUserDetails } from 'types';
import { action } from 'typesafe-actions';

import ActionTypes from './constants';
import { IStatusMessage } from './types';

export const getUserDetails = () => action(ActionTypes.GET_USER_DETAILS);
export const getUserDetailsSuccess = (response: IUserDetails) => action(ActionTypes.GET_USER_DETAILS_SUCCESS, response);
export const getUserDetailsFailed = (error: object) => action(ActionTypes.GET_USER_DETAILS_FAILED, error);

export const showStatusMessage = (data: IStatusMessage) => action(ActionTypes.SHOW_STATUS_MESSAGE, data);
export const closeStatusMessage = () => action(ActionTypes.CLOSE_STATUS_MESSAGE);

export const logout = () => action(ActionTypes.LOGOUT);
export const logoutSuccess = () => action(ActionTypes.LOGOUT_SUCCESS);
export const logoutFailed = (error: any) => action(ActionTypes.LOGOUT_FAILED, error);

export const resetRedux = (...args: string[]) => action(ActionTypes.RESET_REDUX, args);
