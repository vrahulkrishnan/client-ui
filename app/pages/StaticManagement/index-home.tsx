import React from 'react';
import { useViewportSize } from '@mantine/hooks';
import { Helmet } from 'react-helmet';

import { Grid, GridCol, Image, Box, BackgroundImage, Center, Card, Typography, Button, Stack } from 'components';
import { hasLoginAccess } from 'config';
import { localRedirect } from 'utils';
import { useGTM } from 'hooks';

import { imageMap } from '../../.images';

import { StaticPageProps } from './types';
import messages from './messages';

const HomePageManagement = (props: StaticPageProps) => {
  useGTM(messages.title);
  const { height } = useViewportSize();
  const isLoggedIn = hasLoginAccess();

  return (
    <>
      <Helmet
        titleTemplate={messages.welcomeTitle}
        defaultTitle={messages.welcomeTitle}
        title={messages.welcomeTitle}
      />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol xs={12} p={0}>
          <Box sx={{ height: height / 2 }}>
            <BackgroundImage
              sx={{
                height: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                cursor: 'pointer'
              }}
              src={imageMap['banner']()}
              onClick={() => {
                localRedirect('/about');
              }}
            >
              <Center sx={{ height: 140 }}>
                <Image name="client-logo" width={180} />
              </Center>
            </BackgroundImage>
          </Box>
          <Card mt={-25} px={30} py={50} color="white">
            <Typography align="center" color="primary" size="xl" weight={600}>
              {messages.welcomeTitle}
            </Typography>
            <Typography my="xl" size="md" align="center" color="#7f7f7f">
              {messages.description}
            </Typography>
            <Center>
              <Stack spacing="xs" my="lg">
                <Image name="step-1" width={100} style={{ margin: 'auto' }} />
                <Typography align="center" color="#7f7f7f">
                  Register and explore #50things to do.
                </Typography>
              </Stack>
            </Center>
            <Center>
              <Stack spacing="xs" my="lg">
                <Image name="step-2" width={100} style={{ margin: 'auto' }} />
                <Typography align="center" color="#7f7f7f">
                  Take a pic of yourself enjoying any of the listed activities
                </Typography>
              </Stack>
            </Center>
            <Center>
              <Stack spacing="xs" my="lg">
                <Image name="step-3" width={100} style={{ margin: 'auto' }} />
                <Typography align="center" color="#7f7f7f">
                  Upload and enter the draw for a chance to win
                </Typography>
              </Stack>
            </Center>
            <Button
              fullWidth
              size="xl"
              sx={{ fontSize: 18 }}
              onClick={() => {
                localRedirect(isLoggedIn ? '/activities' : '/login');
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
};

export default HomePageManagement;
