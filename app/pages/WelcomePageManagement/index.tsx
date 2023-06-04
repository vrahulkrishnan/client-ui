import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useViewportSize } from '@mantine/hooks';
import { Avatar, useMantineTheme } from '@mantine/core';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

import { Box, Card, Center, Grid, GridCol, Typography, Button, BackgroundImage, LoadingIndicator } from 'components';
import { useGTM } from 'hooks';
import { localRedirect } from 'utils';
import * as AppSelectors from 'pages/AppManagement/selectors';
import { imageMap } from '../../.images';

import { WelcomeManagementProps } from './types';
import messages from './messages';

const stateSelector = createStructuredSelector({
  userDetails: AppSelectors.makeSelectUserDetails(),
  loading: AppSelectors.makeSelectLoading()
});

export default function WelcomePageManagement({ setPageTitle }: WelcomeManagementProps) {
  useGTM(messages.title);
  const theme = useMantineTheme();
  const { height } = useViewportSize();
  const { userDetails, loading } = useSelector(stateSelector);

  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.title);
    }
  }, [setPageTitle]);

  return (
    <>
      <Helmet titleTemplate={messages.pageTitle} defaultTitle={messages.pageTitle} title={messages.pageTitle} />
      <LoadingIndicator visible={loading} />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} p={0}>
          <Box>
            <BackgroundImage
              sx={{
                backgroundRepeat: 'no-repeat',
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
              <Center pb="xl" sx={{ height: height / 2 - 180, position: 'relative', zIndex: 1 }}>
                <Typography weight={600} size="xl" color={theme.white}>
                  {messages.title}
                </Typography>
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-40} py={35} px={50} color="white">
            <Center my="xl">
              <Avatar
                size={120}
                src={userDetails?.image ? userDetails?.image?.imageUrl : imageMap['user-pic-png']()}
                radius={150}
              />
            </Center>
            <Typography align="center" mb="md" weight={600} size="xl" color="primary">
              {`${userDetails?.firstName} ${userDetails?.lastName}`}
            </Typography>
            <Typography align="center" mb="xl" color="#7f7f7f">
              {messages.description}
            </Typography>
            <Button
              fullWidth
              size="lg"
              mt="xl"
              sx={{ fontSize: 18 }}
              onClick={() => {
                localRedirect('/restaurants');
              }}
              component="a"
            >
              {messages.button}
            </Button>
          </Card>
        </GridCol>
      </Grid>
    </>
  );
}
