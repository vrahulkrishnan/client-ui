/**
 * The restaurant state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectRestaurant = (state: ApplicationRootState) => state.restaurant || initialState;

const makeSelectLoading = () => createSelector(selectRestaurant, restaurantState => restaurantState.loading);
const makeSelectRestaurants = () => createSelector(selectRestaurant, restaurantState => restaurantState.restaurants);
const makeSelectRestaurant = () => createSelector(selectRestaurant, restaurantState => restaurantState.restaurant);
const makeSelectActivities = () => createSelector(selectRestaurant, restaurantState => restaurantState.activities);

export { selectRestaurant, makeSelectLoading, makeSelectActivities, makeSelectRestaurants, makeSelectRestaurant };
