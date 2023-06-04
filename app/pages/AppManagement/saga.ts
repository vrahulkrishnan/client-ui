import { call, all, takeLatest, put } from 'redux-saga/effects';

import { apiRequestHelper, errorHandlerSaga, localRedirect } from 'utils';

import ActionTypes from './constants';
import * as Actions from './actions';
import * as Endpoints from './endpoints';
import { getMappedProfileDetails } from './mappings';

/**
 * Get User details
 */
export function* getUserDetails() {
  try {
    const response = yield apiRequestHelper(Endpoints.getUserDetails);
    yield put(Actions.getUserDetailsSuccess(getMappedProfileDetails(response.data)));
  } catch (err: any) {
    // Get user details is required for our application to render logined user details
    // if fail, we are forcing to login page to stop proceeding further
    // yield put(Actions.doLogout());
    yield localStorage.clear();
  }
}

export function* logout() {
  try {
    yield apiRequestHelper(Endpoints.logout);
    yield put(Actions.logoutSuccess());
    yield localRedirect('/login');
  } catch (err) {
    yield call(errorHandlerSaga, err, Actions.logoutFailed);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* callAppSaga() {
  // Watches for corresponding actions and calls the second argument function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    yield takeLatest(ActionTypes.GET_USER_DETAILS, getUserDetails),
    yield takeLatest(ActionTypes.LOGOUT, logout)
  ]);
}
