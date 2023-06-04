import { ProfileManagementState, ProfileManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Profile
export const initialState: ProfileManagementState = {
  activities: [],
  loading: false,
  restaurants: [],
  response: '',
  error: ''
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function profileReducer(
  state: ProfileManagementState = initialState,
  action: ProfileManagementActions
): ProfileManagementState {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITY_STATUS_LIST:
    case ActionTypes.GET_RESTAURANT_LIST:
    case ActionTypes.UPDATE_PROFILE:
    case ActionTypes.UPDATE_PROFILE_IMAGE:
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
    case ActionTypes.GET_ACTIVITY_STATUS_LIST_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        loading: false
      };
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
    case ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: ''
      };
    case ActionTypes.GET_ACTIVITY_STATUS_LIST_FAILED:
    case ActionTypes.GET_RESTAURANT_LIST_FAILED:
    case ActionTypes.UPDATE_PROFILE_IMAGE_FAILED:
    case ActionTypes.UPDATE_PROFILE_FAILED:
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

export default profileReducer;
