import {
  Card,
  Group,
  Image,
  Typography,
  Progress,
  Box,
  ActionIcon,
  Icon,
  TextInput,
  Button,
  LoadingIndicator
} from 'components';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import * as AppSelectors from 'pages/AppManagement/selectors';
import { localRedirect } from 'utils';
import { useGTM } from 'hooks';

import { imageMap } from '../../.images';

import messages from './messages';
import { ProfileManagementProps } from './types';

const stateSelector = createStructuredSelector({
  userDetails: AppSelectors.makeSelectUserDetails(),
  loading: AppSelectors.makeSelectLoading()
});

const ProfileViewManagement = ({ setPageTitle }: ProfileManagementProps) => {
  useGTM(messages.view.title);
  const { userDetails, loading } = useSelector(stateSelector);
  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.view.title);
    }
  }, [setPageTitle]);
  return (
    <>
      <Helmet titleTemplate={messages.view.title} defaultTitle={messages.view.title} title={messages.view.title} />
      <LoadingIndicator visible={loading} />
      <Card p="xl" radius={0} color="white" sx={theme => ({ background: theme.colors.primary[5] })}>
        <Group position="apart" align="flex-start">
          <Group>
            <Image
              width={75}
              height={75}
              radius={100}
              src={userDetails?.image ? userDetails?.image?.imageUrl : imageMap['user-pic-png']()}
            />
            <Box>
              <Typography size="lg" color="white" weight={600}>
                {`${userDetails?.firstName} ${userDetails?.lastName}`}
              </Typography>
              <Typography size="sm" pb={4} pt={6} color="white" weight={500}>
                {messages.view.progress}
              </Typography>
              <Progress
                color="#6adec1"
                value={userDetails?.participatedActivityPercent || 0}
                label={`${userDetails?.participatedActivityPercent || 0}%`}
                size="md"
                radius="md"
                styles={() => ({
                  label: {
                    fontSize: '10'
                  }
                })}
              />
            </Box>
          </Group>
          <ActionIcon
            sx={{ backgroundColor: '#f5b68d', boxShadow: '10px 10px 39px 0px rgba(0,0,0,0.51)' }}
            size="lg"
            variant="filled"
            onClick={() => localRedirect(`/profile/edit/${userDetails.id}`)}
          >
            <Icon name="edit" size="14px" />
          </ActionIcon>
        </Group>
      </Card>
      <Card px={50} py={35} radius={0}>
        <TextInput
          variant="filled"
          size="lg"
          mb="lg"
          disabled
          value={userDetails?.firstName}
          styles={() => ({ disabled: { color: '#000000 !important', fontWeight: 500 } })}
        />
        <TextInput
          variant="filled"
          size="lg"
          mb="lg"
          disabled
          value={userDetails?.lastName}
          styles={() => ({ disabled: { color: '#000000 !important', fontWeight: 500 } })}
        />
        <TextInput
          variant="filled"
          size="lg"
          mb="lg"
          disabled
          value={userDetails?.emailId}
          styles={() => ({ disabled: { color: '#000000 !important', fontWeight: 500 } })}
        />
        <TextInput
          variant="filled"
          size="lg"
          mb="lg"
          disabled
          value={userDetails?.phone}
          styles={() => ({ disabled: { color: '#000000 !important', fontWeight: 500 } })}
        />
        <TextInput
          variant="filled"
          size="lg"
          mb="lg"
          disabled
          value={userDetails?.city || messages.view.label.city}
          styles={() => ({ disabled: { color: '#000000 !important', fontWeight: 500 } })}
        />
        <TextInput
          variant="filled"
          size="lg"
          mb="lg"
          disabled
          value={userDetails?.country || messages.view.label.country}
          styles={() => ({ disabled: { color: '#000000 !important', fontWeight: 500 } })}
        />
        <Button
          fullWidth
          onClick={() => localRedirect('/profile/activity-status')}
          size="lg"
          mt="md"
          sx={{ fontSize: 18 }}
        >
          {messages.view.button}
        </Button>
      </Card>
    </>
  );
};

export default ProfileViewManagement;
