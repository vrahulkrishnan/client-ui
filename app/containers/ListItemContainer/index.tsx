import React from 'react';

import { Box, BoxWrapper, Group, Image, Stack, Typography, Title } from 'components';
import { ListItemContainerProps } from './types';

export const ListItemContainer = ({ mainImage, name, description }: ListItemContainerProps) => {
  return (
    <BoxWrapper color="gray" p="1rem">
      <Group spacing={24}>
        <Box sx={{ width: '100px', minHeight: '100px' }}>
          <Image
            src={mainImage.imageUrl}
            styles={theme => ({ image: { borderRadius: theme.defaultRadius, minHeight: '100px' } })}
          />
        </Box>
        <Stack spacing={4} sx={{ flex: 1 }}>
          <Title color="primary" order={4}>
            {name}
          </Title>
          <Typography sx={{ fontSize: '14px' }} lineClamp={4} color="#7f7f7f">
            {description}
          </Typography>
        </Stack>
      </Group>
    </BoxWrapper>
  );
};
