import React, { useState } from 'react';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';

import { Box, BoxWrapper, Image, Stack, Typography, Title } from 'components';
import { DetailGalleryContainerProps } from './types';

const TRANSITION_DURATION = 200;
export const DetailGalleryContainer = ({ images, name, description }: DetailGalleryContainerProps) => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return (
    <BoxWrapper color="white" p="1.5rem">
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
            {images.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image
                  src={image.imageUrl}
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
        <Stack spacing={4} sx={{ flex: 1 }} p="1rem 2.5rem">
          <Title color="primary" order={4}>
            {name}
          </Title>
          <Typography sx={{ fontSize: '14px' }} color="#7f7f7f">
            {description}
          </Typography>
        </Stack>
      </Stack>
    </BoxWrapper>
  );
};
