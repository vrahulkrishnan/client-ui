import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Anchor, Group, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useShallowEffect, useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Grid,
  GridCol,
  LoadingIndicator,
  PasswordInput,
  TextInput,
  Typography
} from 'components';
import { hasLoginAccess } from 'config';
import { useGTM } from 'hooks';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { imageMap } from '../../.images';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { AuthManagementProps, LoginFormTypes } from './types';
import messages from './messages';

const key = 'auth';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading()
});

export default function LoginManagement(props: AuthManagementProps) {
  const { loading } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.login.title);
  const isLoggedIn = hasLoginAccess();
  const theme = useMantineTheme();
  const { login } = messages;
  const { height } = useViewportSize();

  useShallowEffect(() => {
    if (isLoggedIn) {
      localRedirect('/welcome');
    }
  }, []);

  const dispatch = useDispatch();
  const form = useForm<LoginFormTypes>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : login.errors.email),
      password: value => (!value.length ? login.errors.password : null)
    }
  });
  const handleSubmit = (values: LoginFormTypes) => {
    const from = props.location?.state?.from || {};

    dispatch(Actions.login({ ...values, redirectPath: from.pathname || '/welcome' }));
  };

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('error'));
      dispatch(Actions.resetRedux('response'));
    };
  }, []);

  return (
    <>
      <Helmet titleTemplate={login.title} defaultTitle={login.title} title={login.title} />
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
                  {login.title}
                </Typography>
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-110} p={50} color="white">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                variant="filled"
                placeholder={login.label.email}
                size="lg"
                mb="lg"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                variant="filled"
                placeholder={login.label.password}
                size="lg"
                mb="lg"
                {...form.getInputProps('password')}
              />
              <Group position="right" mb="xl">
                <UnstyledButton
                  onClick={() => {
                    localRedirect('/forgot-password');
                  }}
                  component="a"
                  sx={{ color: theme.colors.primary[5], textDecoration: 'underline' }}
                >
                  {login.button.forgot}
                </UnstyledButton>
              </Group>
              <Button fullWidth type="submit" size="lg" sx={{ fontSize: 18 }}>
                {login.button.login}
              </Button>
            </form>
            <Typography align="center" my="md" color="#7f7f7f">
              {login.register}{' '}
              <Anchor
                weight={500}
                color="primary"
                onClick={() => {
                  localRedirect('/register');
                }}
              >
                {login.signUp}
              </Anchor>
            </Typography>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
