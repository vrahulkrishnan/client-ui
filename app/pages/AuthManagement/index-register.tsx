import { omit } from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useSetState, useShallowEffect } from '@mantine/hooks';
import { Anchor, Checkbox, Popover, Progress, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';

import {
  BackgroundImage,
  Box,
  TextInput,
  Button,
  Card,
  Center,
  Grid,
  GridCol,
  LoadingIndicator,
  Typography,
  PasswordInput,
  Group,
  TelField
} from 'components';
import { hasLoginAccess } from 'config';
import { useGTM } from 'hooks';
import { useInjectSaga, useInjectReducer, localRedirect } from 'utils';
import { imageMap } from '../../.images';

import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { AuthManagementProps, RegistrationFormTypes } from './types';
import messages from './messages';
import { getPasswordStrength, validations } from './validations';
import PasswordRequirement from './PasswordRequirement';

const key = 'auth';
const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectLoading()
});

export default function RegisterManagement(props: AuthManagementProps) {
  const { loading } = useSelector(stateSelector);
  const [state, setState] = useSetState<{ popoverOpened: boolean; passwordStrength: number }>({
    popoverOpened: false,
    passwordStrength: 0
  });
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.register.title);
  const isLoggedIn = hasLoginAccess();
  const { register } = messages;

  const theme = useMantineTheme();

  useShallowEffect(() => {
    if (isLoggedIn) {
      localRedirect('/welcome');
    }
  }, [isLoggedIn]);

  const form = useForm<RegistrationFormTypes>({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      hasGivenConsent: false
    },
    validate: {
      firstName: value => (!value.length ? register.errors.firstName : null),
      lastName: value => (!value.length ? register.errors.lastName : null),
      phone: value => (!value.length ? register.errors.phone : null),
      confirmPassword: value => (!value.length ? register.errors.confirmPassword : null),
      emailId: value => (/^\S+@\S+$/.test(value) ? null : register.errors.email),
      password: value => (value || state.passwordStrength === 100 ? null : register.errors.password),
      hasGivenConsent: value => (!value ? register.errors.checkbox : null)
    }
  });
  const { protocol, host } = window.location;
  const checks = validations.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
  ));

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('password', event.target.value);
    setState({ passwordStrength: getPasswordStrength(event.target.value) });
  };

  const handleRegister = (values: RegistrationFormTypes) => {
    dispatch(Actions.registerUser(omit(values, ['confirmPassword']), `${protocol}//${host}/verification`));
  };
  useEffect(() => {
    return () => {
      dispatch(Actions.resetRedux('error'));
      dispatch(Actions.resetRedux('response'));
    };
  }, []);

  return (
    <>
      <Helmet titleTemplate={register.title} defaultTitle={register.title} title={register.title} />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} p={0}>
          <Box sx={{ height: 250 }}>
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
                  opacity: 0.8
                }
              }}
              src={imageMap['banner']()}
            >
              <Center sx={{ height: 148, position: 'relative', zIndex: 1 }}>
                <Typography weight={600} size="xl" color={theme.white}>
                  {register.title}
                </Typography>
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-110} p={32} color="white">
            <form onSubmit={form.onSubmit(handleRegister)}>
              <Typography align="center" weight={500} color="#7f7f7f" px="md" mb="lg">
                {register.description}
              </Typography>
              <TextInput
                variant="filled"
                placeholder={register.label.firstName}
                size="lg"
                mb="lg"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                variant="filled"
                placeholder={register.label.lastName}
                size="lg"
                mb="lg"
                {...form.getInputProps('lastName')}
              />
              <TextInput
                variant="filled"
                placeholder={register.label.email}
                size="lg"
                mb="lg"
                {...form.getInputProps('emailId')}
              />
              <TelField
                placeholder={register.label.phone}
                containerStyle={{ marginBottom: 20 }}
                {...form.getInputProps('phone')}
              />
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
                      variant="filled"
                      placeholder={register.label.password}
                      size="lg"
                      mb="lg"
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
                  <PasswordRequirement
                    label={register.label.passwordRequirement}
                    meets={form.values.password.length > 5}
                  />
                  {checks}
                </Popover.Dropdown>
              </Popover>

              <PasswordInput
                variant="filled"
                placeholder={register.label.confirmPassword}
                size="lg"
                mb="lg"
                {...form.getInputProps('confirmPassword')}
              />
              <Checkbox
                label={
                  <Typography span inline color="#7f7f7f">
                    {register.label.checkbox}{' '}
                    <Anchor
                      inline
                      onClick={() => {
                        localRedirect('/privacy-policy');
                      }}
                    >
                      {register.privacy}
                    </Anchor>{' '}
                    and{' '}
                    <Anchor
                      inline
                      onClick={() => {
                        localRedirect('/terms');
                      }}
                    >
                      {register.terms}
                    </Anchor>
                  </Typography>
                }
                color="orange"
                size="sm"
                mb="lg"
                {...form.getInputProps('hasGivenConsent')}
              />
              <Button fullWidth type="submit" size="lg" sx={{ fontSize: 18 }}>
                {register.button.register}
              </Button>
            </form>
            <Group my="xl" position="apart">
              <Typography align="center" weight={500} color="#7f7f7f">
                {register.login}
              </Typography>
              <UnstyledButton
                component="a"
                onClick={() => {
                  localRedirect('/login');
                }}
                sx={{ color: theme.colors.primary[5], textDecoration: 'underline' }}
              >
                {register.button.login}
              </UnstyledButton>
            </Group>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
