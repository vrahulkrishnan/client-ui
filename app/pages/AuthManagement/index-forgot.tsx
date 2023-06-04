import { useForm } from '@mantine/form';
import { useMantineTheme } from '@mantine/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useShallowEffect, useViewportSize } from '@mantine/hooks';

import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Grid,
  GridCol,
  LoadingIndicator,
  TextInput,
  Typography
} from 'components';
import { useGTM } from 'hooks';
import { hasLoginAccess } from 'config';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { imageMap } from '../../.images';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';

import { AuthManagementProps } from './types';
import messages from './messages';

const key = 'auth';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  response: Selectors.makeSelectResponse()
});

export default function ForgotPasswordManagement(props: AuthManagementProps) {
  const { loading, response } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.forgotPassword.title);
  const isLoggedIn = hasLoginAccess();
  const { forgotPassword } = messages;
  const theme = useMantineTheme();
  const { height } = useViewportSize();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      emailId: ''
    },
    validate: {
      emailId: value => (/^\S+@\S+$/.test(value) ? null : forgotPassword.errors.email)
    }
  });

  useEffect(() => {
    if (response) {
      form.reset();
    }
  }, [response]);

  useShallowEffect(() => {
    if (isLoggedIn) {
      localRedirect('/welcome');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('response'));
      dispatch(Actions.resetRedux('error'));
    };
  }, []);

  const { protocol, host } = window.location;

  const handleSubmit = (values: { emailId: any }) => {
    dispatch(
      Actions.forgotPassword({ emailId: values.emailId, verificationLink: `${protocol}//${host}/reset-password` })
    );
  };

  return (
    <>
      <Helmet titleTemplate={forgotPassword.title} defaultTitle={forgotPassword.title} title={forgotPassword.title} />
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
                  {forgotPassword.title}
                </Typography>
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-110} p={50} color="white">
            <Typography align="center" mb="xl" color="#7f7f7f">
              {forgotPassword.description}
            </Typography>
            {response && (
              <Typography mb="xl" align="center" size="sm" color="success">
                {forgotPassword.successfull}
              </Typography>
            )}
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                variant="filled"
                placeholder={forgotPassword.label.email}
                size="lg"
                mb="lg"
                {...form.getInputProps('emailId')}
              />
              <Button fullWidth type="submit" size="lg" mt="lg" sx={{ fontSize: 18 }}>
                {forgotPassword.button.reset}
              </Button>
            </form>
            <Typography align="center" my="md" color="#7f7f7f">
              {forgotPassword.register}{' '}
              <Anchor
                weight={500}
                color="primary"
                onClick={() => {
                  localRedirect('/register');
                }}
              >
                {forgotPassword.signUp}
              </Anchor>
            </Typography>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
