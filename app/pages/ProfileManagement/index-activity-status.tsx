import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga, useInjectReducer } from 'utils';
import { Grid, GridCol, Select, Stack, Typography, LoadingIndicator } from 'components';
import { ListStatusItemContainer } from 'containers';
import { dropDown } from 'config';
import { useGTM } from 'hooks';

import * as Selectors from './selectors';
import * as Actions from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { ProfileManagementProps } from './types';

const key = 'profile';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activities: Selectors.makeSelectActivities(),
  restaurants: Selectors.makeSelectRestaurants()
});

export default function ActivityStatusManagement({ setPageTitle }: ProfileManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.list.title);
  const { loading, activities, restaurants } = useSelector(stateSelector);
  const [restaurant, setRestaurant] = useState(dropDown);

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.list.title);
    }
  }, [setPageTitle]);

  useEffect(() => {
    dispatch(Actions.getRestaurantList());
  }, []);

  useEffect(() => {
    if (restaurants.length > 0 && !restaurant?.value) {
      setRestaurant(restaurants[0]);
    }
  }, [restaurants]);

  useEffect(() => {
    if (restaurant?.value) {
      dispatch(Actions.getActivityStatusList(restaurant.value));
    }
  }, [restaurant]);

  return (
    <>
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} p={0}>
          <Select
            p="lg"
            size="md"
            placeholder={messages.list.placeholder.restaurant}
            radius="xl"
            required
            data={restaurants}
            styles={theme => ({
              input: {
                backgroundColor: theme.colors.primary[5],
                color: theme.white,
                boxShadow: 'none',
                padding: '0 1rem',
                fontSize: theme.fontSizes.sm,
                '&::placeholder': { color: theme.white }
              },
              rightSection: {
                '& svg': {
                  color: `${theme.white} !important`
                }
              }
            })}
            value={restaurant.value || ''}
            onChange={(val: string) => {
              const selected = restaurants.find(it => String(it.value) === String(val));
              if (selected) {
                setRestaurant(selected);
              }
            }}
          />
          <Stack p="lg" pt="0">
            {(activities || []).map((activity, index) => (
              <ListStatusItemContainer key={index} {...activity} name={activity.title} />
            ))}
          </Stack>
          {activities.length === 0 && (
            <Typography py={50} align="center">
              No Activities found
            </Typography>
          )}
        </GridCol>
      </Grid>
    </>
  );
}
