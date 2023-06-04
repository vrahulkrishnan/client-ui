import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useMediaQuery } from '@mantine/hooks';

import { useInjectSaga, useInjectReducer } from 'utils';
import { LoadingIndicator, Toaster, Title, Center } from 'components';
import { hasLoginAccess } from 'config';
import { Routes } from 'routes';

import { Layout } from './containers';

import * as Selectors from './selectors';
import * as Actions from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { AppManagementProps } from './types';

const key = 'app';
const stateSelector = createStructuredSelector({
  isLoading: Selectors.makeSelectLoading(),
  userDetails: Selectors.makeSelectUserDetails(),
  status: Selectors.makeSelectStatusMessage()
});

export default function AppManagement(props: AppManagementProps) {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { isLoading, status, userDetails } = useSelector(stateSelector);
  const [pageTitle, setPageTitle] = useState('');
  const isLoggedIn = hasLoginAccess();

  const closeToaster = () => {
    dispatch(Actions.closeStatusMessage());
  };
  useEffect(() => {
    let id;
    if (status.message) {
      id = setTimeout(() => {
        closeToaster();
      }, 4000);
    }
    () => {
      clearTimeout(id);
    };
  }, [status]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(Actions.getUserDetails());
    }
  }, [isLoggedIn]);

  const matches = useMediaQuery('(max-width: 800px)');

  return (
    <>
      <Helmet titleTemplate={messages.title} defaultTitle={messages.title} title={messages.title} />
      <LoadingIndicator visible={isLoading} />
      {status.message && (
        <Toaster
          type={status.type}
          onClose={() => {
            closeToaster();
          }}
        >
          {status.message}
        </Toaster>
      )}
      {matches ? (
        <Routes
          setPageTitle={setPageTitle}
          userDetails={userDetails}
          {...props}
          layout={Layout}
          layoutProps={{ pageTitle, dispatch }}
        />
      ) : (
        <Center sx={{ height: '100%' }}>
          <Title order={2}>{messages.warning}</Title>
        </Center>
      )}
    </>
  );
}
