import { IUserDetails } from 'types';

import { AppManagementState, AppManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the App
export const initialState: AppManagementState = {
  userDetails: {} as IUserDetails,
  loading: false,
  status: { message: '', type: 'success' },
  showStatus: false
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(state: AppManagementState = initialState, action: AppManagementActions): AppManagementState {
  switch (action.type) {
    case ActionTypes.GET_USER_DETAILS:
    case ActionTypes.LOGOUT:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        loading: false
      };
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.LOGOUT_FAILED:
    case ActionTypes.GET_USER_DETAILS_FAILED:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.SHOW_STATUS_MESSAGE:
      return {
        ...state,
        status: action.payload
      };
    case ActionTypes.CLOSE_STATUS_MESSAGE:
      return {
        ...state,
        status: initialState.status
      };
    case ActionTypes.RESET_REDUX:
      // eslint-disable-next-line no-case-declarations
      const keys = action.payload || [];
      return keys.length
        ? {
            ...state,
            ...keys.reduce((acc, key) => ({ ...acc, [key]: initialState[key] }), {})
          }
        : initialState;
    default:
      return state;
  }
}

export default appReducer;
