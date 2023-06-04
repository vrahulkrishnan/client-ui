/**
 * The app state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

import { initialState } from './reducer';

const selectApp = (state: ApplicationRootState) => state.app || initialState;

const makeSelectLoading = () => createSelector(selectApp, substate => substate.loading);
const makeSelectUserDetails = () => createSelector(selectApp, substate => substate.userDetails);
const makeSelectStatusMessage = () => createSelector(selectApp, substate => substate.status);

export { makeSelectLoading, makeSelectUserDetails, makeSelectStatusMessage };
