import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet';

import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { Grid, GridCol, LoadingIndicator, Stack, Anchor, Typography, Title } from 'components';
import { DetailGalleryContainer, ListItemContainer } from 'containers';
import { useGTM } from 'hooks';

import * as Selectors from './selectors';
import * as Actions from './actions';
import saga from './saga';
import reducer from './reducer';
import { RestaurantManagementProps } from './types';
import messages from './messages';

const key = 'restaurant';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  restaurant: Selectors.makeSelectRestaurant(),
  activities: Selectors.makeSelectActivities()
});

export default function RestaurantDetailsManagement({ setPageTitle }: RestaurantManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { restaurant, activities, loading } = useSelector(stateSelector);
  useGTM(restaurant.name);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(restaurant.name);
    }
  }, [setPageTitle, restaurant]);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(Actions.getRestaurant(id));
      });
    }
    return () => {
      dispatch(Actions.resetRedux('restaurant'));
    };
  }, [id]);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(Actions.getActivityList(restaurant?.id));
    }
  }, [restaurant]);

  return (
    <>
      <Helmet
        titleTemplate={messages.list.pageTitle}
        defaultTitle={messages.list.pageTitle}
        title={messages.list.pageTitle}
      />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol span={12}>
          {restaurant && !isEmpty(restaurant) && <DetailGalleryContainer {...restaurant} name={restaurant.name} />}
        </GridCol>
        <GridCol span={12} px="4.5rem">
          <Title order={3}>Activities</Title>
        </GridCol>
        <GridCol span={12} px={36}>
          <Stack p="lg">
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
            {activities.length === 0 && (
              <Typography py={0} align="center">
                No activities found
              </Typography>
            )}
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}
