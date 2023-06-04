import React from 'react';

import { Box, BoxWrapper, Group, Image, Typography, Title, Stack, Icon } from 'components';
import { ListStatusItemContainerProps } from './types';

export const ListStatusItemContainer = ({ image, name, status }: ListStatusItemContainerProps) => {
  const isApproved = status === 'approved';
  return (
    <BoxWrapper color="gray" p="0" sx={{ position: 'relative' }}>
      <Group spacing={24} p="0.75rem 1rem" noWrap sx={{ maxWidth: `calc(100% - 100px)` }}>
        <Box sx={{ width: '80px', minHeight: '80px' }}>
          <Image
            src={image.imageUrl}
            styles={theme => ({ image: { borderRadius: theme.defaultRadius, minHeight: '80px', minWidth: '80px' } })}
          />
        </Box>
        <Title color="#7f7f7f" order={5}>
          {name}
        </Title>
      </Group>
      <Group
        p="0.5rem"
        sx={theme => ({
          backgroundColor: isApproved ? theme.colors.primary[5] : '#7f7f7f',
          width: '100px',
          height: '100%',
          position: 'absolute',
          right: 0,
          top: 0,
          borderTopRightRadius: theme.defaultRadius,
          borderBottomRightRadius: theme.defaultRadius,
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <Stack align="center">
          <Icon name={isApproved ? 'tick' : 'ellipsis'} size="1.5rem" color="white" />
          <Typography
            weight={500}
            size="sm"
            sx={theme => ({ color: theme.white, textTransform: 'capitalize' })}
            lineClamp={4}
          >
            {status || 'Pending'}
          </Typography>
        </Stack>
      </Group>
    </BoxWrapper>
  );
};
