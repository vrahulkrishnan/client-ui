import React from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';

import { ICON_SIZE } from '../../config';
import Icon from '../Icon';

import { SearchProps } from './types';
import messages from './messages';

const Search = ({ value, placeholder, onClear, ...props }: SearchProps) => {
  const theme = useMantineTheme();
  return (
    <TextInput
      placeholder={placeholder ? placeholder : messages.placeholder}
      rightSection={
        <>
          {value ? (
            <ActionIcon sx={theme => ({ color: theme.colors.dark[5] })} onClick={onClear}>
              <Icon name="close-circle" size={ICON_SIZE} color={theme.colors.primary[5]} />
            </ActionIcon>
          ) : (
            <Icon name="search" size={ICON_SIZE} />
          )}
        </>
      }
      value={value}
      {...props}
    />
  );
};
export default Search;
