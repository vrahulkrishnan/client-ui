/**
 * The activity state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectActivity = (state: ApplicationRootState) => state.activity || initialState;

const makeSelectLoading = () => createSelector(selectActivity, activityState => activityState.loading);
const makeSelectActivities = () => createSelector(selectActivity, activityState => activityState.activities);
const makeSelectRestaurants = () => createSelector(selectActivity, activityState => activityState.restaurants);
const makeSelectActivity = () => createSelector(selectActivity, activityState => activityState.activity);

export { selectActivity, makeSelectLoading, makeSelectActivities, makeSelectRestaurants, makeSelectActivity };
