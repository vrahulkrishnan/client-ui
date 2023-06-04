import { call, all, takeLatest, put, Effect } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga } from 'utils';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import * as Mappings from './mappings';

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
 * Get Restaurant Details
 */
export function* getRestaurant(data: Effect<string, string>) {
  try {
    const response = yield apiRequestHelper(Endpoints.getRestaurant, data.payload);
    yield put(Actions.getRestaurantSuccess(Mappings.getMappedRestaurant(response.data)));
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.getRestaurantFailed);
  }
}

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
 * Root saga manages watcher lifecycle
 */
export default function* callRestaurantSaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_RESTAURANT_LIST, getRestaurantList),
    yield takeLatest(ActionTypes.GET_RESTAURANT, getRestaurant),
    yield takeLatest(ActionTypes.GET_ACTIVITY_LIST, getActivityList)
  ]);
}
