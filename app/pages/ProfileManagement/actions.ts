import { action } from 'typesafe-actions';

import ActionTypes from './constants';

export const updateProfileDetails = (data: any) => action(ActionTypes.UPDATE_PROFILE, data);
export const updateProfileDetailsSuccess = (response: any) => action(ActionTypes.UPDATE_PROFILE_SUCCESS, response);
export const updateProfileDetailsFailed = (error: any) => action(ActionTypes.UPDATE_PROFILE_FAILED, error);

export const updateProfileImage = (file: File) => action(ActionTypes.UPDATE_PROFILE_IMAGE, file);
export const updateProfileImageSuccess = (response: any) => action(ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS, response);
export const updateProfileImageFailed = (error: any) => action(ActionTypes.UPDATE_PROFILE_IMAGE_FAILED, error);

export const getActivityStatusList = (restaurant: string) => action(ActionTypes.GET_ACTIVITY_STATUS_LIST, restaurant);
export const getActivityStatusListSuccess = (data: any) => action(ActionTypes.GET_ACTIVITY_STATUS_LIST_SUCCESS, data);
export const getActivityStatusListFailed = (error: object) =>
  action(ActionTypes.GET_ACTIVITY_STATUS_LIST_FAILED, error);

export const getRestaurantList = () => action(ActionTypes.GET_RESTAURANT_LIST);
export const getRestaurantListSuccess = (data: any) => action(ActionTypes.GET_RESTAURANT_LIST_SUCCESS, data);
export const getRestaurantListFailed = (error: any) => action(ActionTypes.GET_RESTAURANT_LIST_FAILED, error);

export const resetRedux = (...args: string[]) => action(ActionTypes.RESET_REDUX, args);
