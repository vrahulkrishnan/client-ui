import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';

import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { Grid, GridCol, Stack, Typography, Anchor, LoadingIndicator } from 'components';
import { ListItemContainer } from 'containers';
import { useGTM } from 'hooks';

import * as Selectors from './selectors';
import * as Actions from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { RestaurantManagementProps } from './types';

const key = 'restaurant';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  restaurants: Selectors.makeSelectRestaurants()
});

export default function RestaurantListManagement({ setPageTitle }: RestaurantManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.list.title);
  const { loading, restaurants } = useSelector(stateSelector);

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.list.title);
    }
  }, [setPageTitle]);

  useEffect(() => {
    dispatch(Actions.getRestaurantList());
  }, []);

  return (
    <>
      <Helmet
        titleTemplate={messages.list.pageTitle}
        defaultTitle={messages.list.pageTitle}
        title={messages.list.pageTitle}
      />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12}>
          <Stack p="lg">
            {(restaurants || []).map((restaurant, index) => (
              <Anchor
                key={index}
                onClick={() => {
                  localRedirect(`/restaurants/${restaurant.id}`);
                }}
                style={{ textDecoration: 'none' }}
              >
                <ListItemContainer {...restaurant} />
              </Anchor>
            ))}
          </Stack>
          {restaurants.length === 0 && (
            <Typography py={50} align="center">
              No restaurants found
            </Typography>
          )}
        </GridCol>
      </Grid>
    </>
  );
}
