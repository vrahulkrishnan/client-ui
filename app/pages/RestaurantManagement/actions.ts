import { action } from 'typesafe-actions';

import ActionTypes from './constants';

export const getRestaurantList = () => action(ActionTypes.GET_RESTAURANT_LIST);
export const getRestaurantListSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_LIST_SUCCESS, data);
export const getRestaurantListFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_LIST_FAILED, error);

export const getRestaurant = (id: string) => action(ActionTypes.GET_RESTAURANT, id);
export const getRestaurantSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_SUCCESS, data);
export const getRestaurantFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_FAILED, error);

export const getActivityList = (restaurant: string) => action(ActionTypes.GET_ACTIVITY_LIST, restaurant);
export const getActivityListSuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_LIST_SUCCESS, data);
export const getActivityListFailed = (error: object) => action(ActionTypes.GET_ACTIVITY_LIST_FAILED, error);

export const resetRedux = (...args: string[]) => action(ActionTypes.RESET_REDUX, args);
