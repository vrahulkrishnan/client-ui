import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useShallowEffect, useViewportSize } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useMantineTheme } from '@mantine/core';

import { BackgroundImage, Box, Card, Center, Grid, GridCol, Icon, LoadingIndicator, Typography } from 'components';
import { hasLoginAccess } from 'config';
import { useGTM } from 'hooks';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';

import { imageMap } from '../../.images';

import * as Selectors from './selectors';
import * as Actions from './actions';
import { AuthManagementProps } from './types';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  response: Selectors.makeSelectResponse(),
  error: Selectors.makeSelectError()
});
const key = 'auth';
export default function VerificationManagement(props: AuthManagementProps) {
  const { loading, response } = useSelector(stateSelector);
  const isLoggedIn = hasLoginAccess();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.verification.title);
  const { verification } = messages;
  const theme = useMantineTheme();
  const { height } = useViewportSize();
  const params = useParams() as any;
  const dispatch = useDispatch();

  useShallowEffect(() => {
    if (isLoggedIn) {
      localRedirect('/welcome');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (params?.verificationId) {
      setTimeout(() => {
        dispatch(Actions.emailVerification(params?.verificationId));
      });
    }
  }, [params?.verificationId]);

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('error'));
      dispatch(Actions.resetRedux('response'));
    };
  }, []);

  return (
    <>
      <Helmet titleTemplate={verification.title} defaultTitle={verification.title} title={verification.title} />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} p={0}>
          <Box sx={{ height: height / 2 }}>
            <BackgroundImage
              sx={{
                height: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                position: 'relative',
                '&:before': {
                  position: 'absolute',
                  backgroundColor: theme.colors.primary[5],
                  width: '100%',
                  height: '100%',
                  content: "''",
                  zIndex: 0,
                  opacity: 0.9
                }
              }}
              src={imageMap['banner']()}
            >
              <Center sx={{ height: height / 2 - 110, position: 'relative', zIndex: 1 }}>
                <Typography weight={600} size="xl" color={theme.white}>
                  {verification.title}
                </Typography>
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-110} p={50} color="white">
            <Center my="xl">
              <Icon name="tick" size="82px" color="#7f7f7f" />
            </Center>
            <Typography align="center" mb="xl" color="#7f7f7f">
              {response?.isNewMailSent
                ? verification.description
                : response.isAlreadySent
                ? verification.alreadySent
                : verification.description}
            </Typography>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
