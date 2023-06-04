import {
  Card,
  Group,
  Avatar,
  ActionIcon,
  Icon,
  TextInput,
  Button,
  LoadingIndicator,
  TelField,
  Typography
} from 'components';
import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Box, FileButton, Select } from '@mantine/core';
import { isEmpty, omit } from 'lodash';
import { useShallowEffect } from '@mantine/hooks';

import * as AppSelectors from 'pages/AppManagement/selectors';
import { useInjectSaga, useInjectReducer } from 'utils';
import { useGTM } from 'hooks';

import { countries } from 'mock';
import { imageMap } from '../../.images';

import messages from './messages';
import { ProfileManagementProps } from './types';
import saga from './saga';
import reducer from './reducer';
import * as Selectors from './selectors';
import * as Actions from './actions';

const key = 'profile';

const stateSelector = createStructuredSelector({
  userDetails: AppSelectors.makeSelectUserDetails(),
  loading: Selectors.makeSelectLoading()
});

const ProfileEditManagement = ({ setPageTitle }: ProfileManagementProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useGTM(messages.edit.title);
  const dispatch = useDispatch();
  const { userDetails, loading } = useSelector(stateSelector);

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.edit.title);
    }
  }, [setPageTitle]);

  const form = useForm<any>({
    initialValues: {
      firstName: '',
      lastName: '',
      emailId: '',
      phone: '',
      country: '',
      city: ''
    },
    validate: {
      firstName: value => (value ? null : messages.edit.error.firstName),
      lastName: value => (value ? null : messages.edit.error.lastName),
      emailId: value => (/^\S+@\S+$/.test(value) ? null : messages.edit.error.email)
    }
  });

  const handleImageChange = (file: File) => {
    if (file?.size > 2000000) {
      setError(messages.edit.error.fileSize);
    } else {
      setFile(file);
      setError('');
      dispatch(Actions.updateProfileImage(file));
    }
  };
  useShallowEffect(() => {
    if (!isEmpty(userDetails)) {
      form.setValues({ ...omit(userDetails, ['id', 'image']) });
    }
  }, [userDetails]);

  const handleProfileUpdate = values => {
    dispatch(Actions.updateProfileDetails(values));
  };

  return (
    <>
      <Helmet titleTemplate={messages.edit.title} defaultTitle={messages.edit.title} title={messages.edit.title} />
      <LoadingIndicator visible={loading} />
      <Card p="xl" radius={0} color="white" sx={theme => ({ background: theme.colors.primary[5] })}>
        <Group position="center" align="center">
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={
                file instanceof File
                  ? URL.createObjectURL(file)
                  : userDetails?.image
                  ? userDetails?.image?.imageUrl
                  : imageMap['user-pic-png']()
              }
              size={120}
              radius={120}
              mx="auto"
            />
            {error && (
              <Typography my="xs" color="white" size="sm">
                {error}
              </Typography>
            )}
            <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
              <FileButton onChange={handleImageChange} accept="image/png,image/jpeg">
                {props => (
                  <ActionIcon
                    sx={{
                      backgroundColor: '#f5b68d',
                      boxShadow: '10px 10px 39px 0px rgba(0,0,0,0.51)'
                    }}
                    size="lg"
                    variant="filled"
                    {...props}
                  >
                    <Icon name="camera" size="14px" />
                  </ActionIcon>
                )}
              </FileButton>
            </Box>
          </Box>
        </Group>
      </Card>
      <Card px={50} py={35} radius={0}>
        <form onSubmit={form.onSubmit(handleProfileUpdate)}>
          <TextInput
            variant="filled"
            size="lg"
            mb="lg"
            placeholder={messages.edit.label.firstName}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            variant="filled"
            size="lg"
            mb="lg"
            placeholder={messages.edit.label.lastName}
            {...form.getInputProps('lastName')}
          />
          <TextInput
            variant="filled"
            size="lg"
            mb="lg"
            placeholder={messages.edit.label.email}
            {...form.getInputProps('emailId')}
          />
          <TelField
            placeholder={messages.edit.label.phone}
            containerStyle={{ marginBottom: 20 }}
            {...form.getInputProps('phone')}
          />
          <TextInput
            variant="filled"
            size="lg"
            mb="lg"
            placeholder={messages.edit.label.city}
            {...form.getInputProps('city')}
          />
          <Select
            variant="filled"
            size="lg"
            mb="lg"
            data={countries}
            placeholder={messages.edit.label.country}
            searchable
            nothingFound="No options"
            {...form.getInputProps('country')}
            styles={() => ({ item: { fontSize: 14 } })}
          />
          <Button fullWidth type="submit" size="lg" mt="md" sx={{ fontSize: 18 }}>
            {messages.edit.button}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default ProfileEditManagement;
