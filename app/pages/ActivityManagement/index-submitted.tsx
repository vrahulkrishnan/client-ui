import React, { useEffect } from 'react';

import { Card, Button, Typography, Center, Icon, Stack } from 'components';
import { localRedirect } from 'utils';
import { useGTM } from 'hooks';

import messages from './messages';

import { ActivityManagementProps } from './types';

export default function ActivitySubmittedManagement({ setPageTitle }: ActivityManagementProps) {
  useGTM(messages.submitted.title);

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.submitted.title);
    }
  }, [setPageTitle]);

  return (
    <Card py={35} px={50} sx={{ height: '100%' }} color="white">
      <Stack sx={{ height: '100%' }} justify="space-between">
        <div>
          <Center my="xl">
            <Icon name="tick" size="5rem" color="#7f7f7f" />
          </Center>
          <Typography align="center" weight={600} size="lg" color="primary">
            {messages.submitted.successMessage}
          </Typography>
          <Typography align="center" size="sm" mb="xl" color="#7f7f7f">
            {messages.submitted.approve}
          </Typography>
        </div>
        <Button
          fullWidth
          size="lg"
          mt="xl"
          sx={{ fontSize: 18 }}
          onClick={() => {
            localRedirect('/profile/activity-status');
          }}
          component="a"
        >
          {messages.submitted.activityStatus}
        </Button>
      </Stack>
    </Card>
  );
}
