import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, localRedirect } from 'utils';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import * as Mappings from './mappings';
import { StampFormTypes } from './types';

/**
 * Get activitylist
 */
export function* getActivityList(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getActivityList, data.payload);
    yield put(Actions.getActivityListSuccess(Mappings.getMappedActivities(response.data?.activities || [])));
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.getActivityListFailed);
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

/**
 * Get Activity Details
 */
export function* getActivity(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getActivity, data.payload);
    yield put(Actions.getActivitySuccess(Mappings.getMappedActivity(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.getActivityFailed);
  }
}

/**
 * Stamp Passport
 */
export function* stampPassport(data: Effect<string, StampFormTypes>) {
  try {
    yield apiRequestHelper(Endpoints.stampPassport, data.payload);
    yield put(Actions.stampPassportSuccess('Successfully stamped your passport'));
    localRedirect('/activities/submitted');
    // localRedirect(`/activities/${data.payload.id}`);
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.stampPassportFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callActivitySaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_ACTIVITY_LIST, getActivityList),
    yield takeLatest(ActionTypes.GET_RESTAURANT_LIST, getRestaurantList),
    yield takeLatest(ActionTypes.GET_ACTIVITY, getActivity),
    yield takeLatest(ActionTypes.STAMP_PASSPORT, stampPassport)
  ]);
}
