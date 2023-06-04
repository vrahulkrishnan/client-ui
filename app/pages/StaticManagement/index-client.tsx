import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';

import { Box, BoxWrapper, Image, Stack, Typography, Title, Grid, GridCol, Anchor } from 'components';
import { useGTM } from 'hooks';
import { StaticPageProps } from './types';

const TRANSITION_DURATION = 200;

import messages from './messages';
import { imageMap } from '.images';

export default function ClientManagement({ setPageTitle }: StaticPageProps) {
  useGTM(messages.client.title);
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.client.title);
    }
  }, [setPageTitle]);
  return (
    <>
      <Helmet
        titleTemplate={messages.client.title}
        defaultTitle={messages.client.title}
        title={messages.client.title}
      />
      <Grid mx={0} sx={{ height: '100%' }}>
        <GridCol span={12}>
          <BoxWrapper color="white" p="1rem">
            <Stack spacing={4}>
              <Box>
                <Carousel
                  slideSize="70%"
                  slideGap="md"
                  withControls={false}
                  withIndicators
                  loop
                  height="100%"
                  getEmblaApi={setEmbla}
                  styles={theme => ({
                    viewport: { height: '250px' },
                    indicator: { backgroundColor: '#7f7f7f', width: '15px', height: '15px' }
                  })}
                >
                  {[imageMap['client-3'](), imageMap['client-2'](), imageMap['client-1']()].map((image, index) => (
                    <Carousel.Slide key={index}>
                      <Image
                        src={image}
                        styles={theme => ({
                          image: {
                            borderRadius: theme.defaultRadius,
                            width: '100%',
                            height: '200px !important',
                            transform: 'perspective(1500px) rotateY(0deg)',
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -20px'
                          }
                        })}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Box>
              <Stack spacing={4} sx={{ flex: 1 }} p="1rem">
                <Title color="primary" order={4}>
                  {messages.client.title}
                </Title>
                <Typography sx={{ fontSize: '14px' }} color="#7f7f7f">
                  {messages.client.description1}
                </Typography>
                <Typography sx={{ fontSize: '14px' }} color="#7f7f7f" pb={8}>
                  {messages.client.description2}
                </Typography>
                <Typography sx={{ fontSize: '14px' }} color="#7f7f7f" pb={8}>
                  {messages.client.description3}
                </Typography>
                <Typography sx={{ fontSize: '14px' }} color="#7f7f7f">
                  {messages.client.description4}{' '}
                  <Anchor
                    weight={500}
                    color="primary"
                    onClick={() => {
                      window.open('http://thebeach.ae/');
                    }}
                  >
                    {messages.client.linkText}
                  </Anchor>{' '}
                  {messages.client.description5}
                </Typography>
              </Stack>
            </Stack>
          </BoxWrapper>
        </GridCol>
      </Grid>
    </>
  );
}
