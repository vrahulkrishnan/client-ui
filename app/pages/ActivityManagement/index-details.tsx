import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Helmet } from 'react-helmet';

import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { Grid, GridCol, LoadingIndicator, Button, Typography } from 'components';
import { useGTM } from 'hooks';
import { DetailContainer } from 'containers';
import { ACTIVITY_STATUS } from 'config';

import * as Selectors from './selectors';
import * as Actions from './actions';
import saga from './saga';
import reducer from './reducer';
import messages from './messages';
import { ActivityManagementProps } from './types';

const key = 'activity';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  activity: Selectors.makeSelectActivity()
});

export default function ActivityDetailsManagement({ setPageTitle }: ActivityManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { activity, loading } = useSelector(stateSelector);
  useGTM(activity.title);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(activity.title);
    }
  }, [setPageTitle, activity]);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(Actions.getActivity(id));
      });
    }
    return () => {
      dispatch(Actions.resetRedux('activity'));
    };
  }, [id]);

  return (
    <>
      <Helmet titleTemplate={messages.pageTitle} defaultTitle={messages.pageTitle} title={messages.pageTitle} />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} px={24}>
          {activity && !isEmpty(activity) && <DetailContainer {...activity} name={activity.title} />}
        </GridCol>
        <GridCol span={12} px={36}>
          <Button
            sx={() => ({
              height: '50px',
              width: '100%'
            })}
            onClick={() => {
              localRedirect(`/activities/${activity.id}/participate`);
            }}
            disabled={ACTIVITY_STATUS.TODO !== activity.progress}
          >
            <Typography sx={theme => ({ color: theme.white, fontWeight: 600, fontSize: '16px' })} align="center">
              {messages.details.participate}
            </Typography>
          </Button>
        </GridCol>
      </Grid>
    </>
  );
}
