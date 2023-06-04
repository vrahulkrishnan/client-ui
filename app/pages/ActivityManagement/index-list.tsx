import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';

import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { Grid, GridCol, Group, Select, Stack, Typography, Anchor, LoadingIndicator } from 'components';
import { useGTM } from 'hooks';
import { ListItemContainer } from 'containers';
import { dropDown } from 'config';

import * as Selectors from './selectors';
import * as Actions from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { ActivityManagementProps } from './types';

const key = 'activity';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activities: Selectors.makeSelectActivities(),
  restaurants: Selectors.makeSelectRestaurants()
});

export default function ActivityListManagement({ setPageTitle }: ActivityManagementProps) {
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
      dispatch(Actions.getActivityList(restaurant.value));
    }
  }, [restaurant]);

  return (
    <>
      <Helmet titleTemplate={messages.pageTitle} defaultTitle={messages.pageTitle} title={messages.pageTitle} />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} p={0}>
          <Group position="right" p="lg" pt="md">
            <Select
              size="sm"
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
          </Group>
          <Stack p="lg" pt="0">
            {(activities || []).map((activity, index) => (
              <Anchor
                key={index}
                onClick={() => {
                  localRedirect(`/activities/${activity.id}`);
                }}
                style={{ textDecoration: 'none' }}
              >
                <ListItemContainer {...activity} name={activity.title} />
              </Anchor>
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
