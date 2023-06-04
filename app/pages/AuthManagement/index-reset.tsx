import { useForm } from '@mantine/form';
import { Popover, Progress, useMantineTheme } from '@mantine/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useSetState, useShallowEffect, useViewportSize } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import {
  PasswordInput,
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Grid,
  GridCol,
  LoadingIndicator,
  Typography
} from 'components';
import { hasLoginAccess } from 'config';
import { useGTM } from 'hooks';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { imageMap } from '../../.images';

import saga from './saga';
import reducer from './reducer';
import * as Actions from './actions';
import * as Selectors from './selectors';
import { AuthManagementProps } from './types';
import messages from './messages';
import PasswordRequirement from './PasswordRequirement';
import { getPasswordStrength, validations } from './validations';

const key = 'auth';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  userId: Selectors.makeSelectUserId()
});

export default function ResetManagement(props: AuthManagementProps) {
  const { loading, userId } = useSelector(stateSelector);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.reset.title);
  const params = useParams() as any;
  const isLoggedIn = hasLoginAccess();
  const { reset } = messages;
  const theme = useMantineTheme();
  const { height } = useViewportSize();
  const dispatch = useDispatch();

  const [state, setState] = useSetState<{ popoverOpened: boolean; passwordStrength: number }>({
    popoverOpened: false,
    passwordStrength: 0
  });

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: value => (value || state.passwordStrength === 100 ? null : reset.errors.password),
      confirmPassword: (value, values) => (value !== values.password ? reset.errors.confirmPassword : null)
    }
  });

  useShallowEffect(() => {
    if (isLoggedIn) {
      localRedirect('/welcome');
    }
  }, [isLoggedIn]);

  const checks = validations.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
  ));

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('password', event.target.value);
    setState({ passwordStrength: getPasswordStrength(event.target.value) });
  };

  useEffect(() => {
    if (params?.verificationId) {
      setTimeout(() => {
        dispatch(Actions.forgotPasswordLinkVerify(params?.verificationId));
      });
    }
  }, [params?.verificationId]);

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('error'));
    };
  }, []);

  const handleResetSubmit = values => {
    dispatch(Actions.resetUserPassword({ password: values.confirmPassword, userId: userId }));
  };

  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('error'));
      dispatch(Actions.resetRedux('response'));
    };
  }, []);

  return (
    <>
      <Helmet titleTemplate={reset.title} defaultTitle={reset.title} title={reset.title} />
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
                  {reset.title}
                </Typography>
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-110} p={50} color="white">
            <form onSubmit={form.onSubmit(handleResetSubmit)}>
              <Popover
                opened={state.popoverOpened}
                position="bottom"
                withArrow
                width="target"
                trapFocus={false}
                transition="pop-top-left"
              >
                <Popover.Target>
                  <div
                    onFocusCapture={() => setState({ popoverOpened: true })}
                    onBlurCapture={() => setState({ popoverOpened: false })}
                  >
                    <PasswordInput
                      size="md"
                      placeholder={reset.label.password}
                      radius="xl"
                      my="lg"
                      {...form.getInputProps('password')}
                      onChange={onPasswordChange}
                    />
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <Progress
                    color={state.passwordStrength > 80 ? 'teal' : state.passwordStrength > 50 ? 'yellow' : 'red'}
                    value={state.passwordStrength}
                    size={5}
                    style={{ marginBottom: 10 }}
                  />
                  <PasswordRequirement label={reset.passwordRequirement} meets={form.values.password.length > 5} />
                  {checks}
                </Popover.Dropdown>
              </Popover>
              <PasswordInput
                {...form.getInputProps('confirmPassword')}
                variant="filled"
                placeholder={reset.label.confirmPassword}
                size="lg"
                mb="lg"
              />
              <Button fullWidth type="submit" size="lg" mt={64} sx={{ fontSize: 18 }}>
                {reset.button.reset}
              </Button>
            </form>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
