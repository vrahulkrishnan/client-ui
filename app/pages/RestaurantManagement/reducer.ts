import { RestaurantManagementState, RestaurantManagementActions } from './types';
import ActionTypes from './constants';

// The initial state of the Restaurant
export const initialState: RestaurantManagementState = {
  loading: false,
  restaurants: [],
  activities: [],
  restaurant: {} as RestaurantManagementState['restaurant']
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function restaurantReducer(
  state: RestaurantManagementState = initialState,
  action: RestaurantManagementActions
): RestaurantManagementState {
  switch (action.type) {
    case ActionTypes.GET_RESTAURANT_LIST:
    case ActionTypes.GET_ACTIVITY_LIST:
    case ActionTypes.GET_RESTAURANT:
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
    case ActionTypes.GET_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload
      };
    case ActionTypes.GET_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        activities: action.payload,
        loading: false
      };
    case ActionTypes.GET_RESTAURANT_LIST_FAILED:
    case ActionTypes.GET_RESTAURANT_FAILED:
    case ActionTypes.GET_ACTIVITY_LIST_FAILED:
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

export default restaurantReducer;
