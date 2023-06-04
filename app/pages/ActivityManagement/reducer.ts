import { ActivityManagementState, ActivityManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Activity
export const initialState: ActivityManagementState = {
  activities: [],
  loading: false,
  restaurants: [],
  activity: {} as ActivityManagementState['activity']
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function activityReducer(
  state: ActivityManagementState = initialState,
  action: ActivityManagementActions
): ActivityManagementState {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITY_LIST:
    case ActionTypes.GET_RESTAURANT_LIST:
    case ActionTypes.GET_ACTIVITY:
    case ActionTypes.STAMP_PASSPORT:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_RESTAURANT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload
      };
    case ActionTypes.GET_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        loading: false
      };
    case ActionTypes.GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activity: action.payload
      };
    case ActionTypes.STAMP_PASSPORT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.GET_ACTIVITY_LIST_FAILED:
    case ActionTypes.GET_RESTAURANT_LIST_FAILED:
    case ActionTypes.STAMP_PASSPORT_FAILED:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.RESET_REDUX:
      return {
        ...state,
        ...action.payload.reduce((acc, key) => ({ ...acc, [key]: initialState[key] }), {})
      };
    default:
      return state;
  }
}

export default activityReducer;
