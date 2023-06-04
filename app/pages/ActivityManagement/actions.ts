import { action } from 'typesafe-actions';

import { StampFormTypes } from './types';
import ActionTypes from './constants';

export const getActivityList = (restaurant: string) => action(ActionTypes.GET_ACTIVITY_LIST, restaurant);
export const getActivityListSuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_LIST_SUCCESS, data);
export const getActivityListFailed = (error: object) => action(ActionTypes.GET_ACTIVITY_LIST_FAILED, error);

export const getRestaurantList = () => action(ActionTypes.GET_RESTAURANT_LIST);
export const getRestaurantListSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_LIST_SUCCESS, data);
export const getRestaurantListFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_LIST_FAILED, error);

export const getActivity = (id: string) => action(ActionTypes.GET_ACTIVITY, id);
export const getActivitySuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_SUCCESS, data);
export const getActivityFailed = (error: any) => action(ActionTypes.GET_ACTIVITY_FAILED, error);

export const stampPassport = (data: StampFormTypes) => action(ActionTypes.STAMP_PASSPORT, data);
export const stampPassportSuccess = (data: any) => action(ActionTypes.STAMP_PASSPORT_SUCCESS, data);
export const stampPassportFailed = (error: any) => action(ActionTypes.STAMP_PASSPORT_FAILED, error);

export const resetRedux = (...args: string[]) => action(ActionTypes.RESET_REDUX, args);
