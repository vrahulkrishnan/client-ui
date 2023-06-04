import React from 'react';
import { createStyles } from '@mantine/core';

import { Box, BoxWrapper, Image, Stack, Typography, Title } from 'components';
import { DetailContainerProps } from './types';

const useStyles = createStyles(theme => {
  return {
    imageBox: { maxWidth: '300px', height: 'auto', position: 'relative', margin: 'auto' },
    image: {
      width: '100%',
      height: '100%'
    },
    textContent: { flex: 1 }
  };
});

export const DetailContainer = ({ mainImage, name, description }: DetailContainerProps) => {
  const { classes } = useStyles();
  return (
    <BoxWrapper color="gray" p="1.5rem">
      <Stack spacing={4}>
        <Box className={classes.imageBox}>
          <Image
            src={mainImage.imageUrl}
            styles={theme => ({
              image: { borderRadius: theme.defaultRadius }
            })}
            className={classes.image}
          />
        </Box>
        <Stack spacing={4} className={classes.textContent} p="1rem">
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
