import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, statusHandlerSaga } from 'utils';
import * as AppAction from 'pages/AppManagement/actions';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import * as Mappings from './mappings';

/**
 * Get activityStatuslist
 */
export function* getActivityStatusList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getActivityStatusList, data.payload);
    yield put(Actions.getActivityStatusListSuccess(Mappings.getMappedActivities(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.getActivityStatusListFailed);
  }
}

/**
 * Get Restaurant List
 */
export function* getRestaurantList() {
  try {
    const response = yield apiRequestHelper(Endpoints.getRestaurantList);
    yield put(Actions.getRestaurantListSuccess(Mappings.getMappedRestaurants(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.getRestaurantListFailed);
  }
}

export function* updateProfileDetails(data: Effect<string, any>) {
  try {
    const response = yield apiRequestHelper(Endpoints.updateProfileDetails, data.payload);
    yield put(Actions.updateProfileDetailsSuccess(response.message));
    yield put(AppAction.getUserDetails());
    yield call(statusHandlerSaga, { message: response.message });
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.updateProfileDetailsFailed);
  }
}

/**
 * Update profile Image
 */
export function* updateProfileImage(data: Effect<string, File>) {
  try {
    const response = yield apiRequestHelper(Endpoints.updateProfileImage, data.payload);
    yield put(Actions.updateProfileDetailsSuccess(response.message));
    yield call(statusHandlerSaga, { message: response.message });
    yield put(AppAction.getUserDetails());
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.updateProfileDetailsFailed);
    yield put(AppAction.getUserDetails());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callProfileSaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_ACTIVITY_STATUS_LIST, getActivityStatusList),
    yield takeLatest(ActionTypes.GET_RESTAURANT_LIST, getRestaurantList),
    yield takeLatest(ActionTypes.UPDATE_PROFILE, updateProfileDetails),
    yield takeLatest(ActionTypes.UPDATE_PROFILE_IMAGE, updateProfileImage)
  ]);
}
