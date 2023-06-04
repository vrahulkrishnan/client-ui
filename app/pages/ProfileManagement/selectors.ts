/**
 * The profile state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectProfile = (state: ApplicationRootState) => state.profile || initialState;

const makeSelectLoading = () => createSelector(selectProfile, profileState => profileState.loading);
const makeSelectActivities = () => createSelector(selectProfile, profileState => profileState.activities);
const makeSelectRestaurants = () => createSelector(selectProfile, profileState => profileState.restaurants);

export { selectProfile, makeSelectLoading, makeSelectActivities, makeSelectRestaurants };
