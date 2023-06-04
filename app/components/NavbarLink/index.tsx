import { createStyles, Tooltip, UnstyledButton } from '@mantine/core';
import React from 'react';
import { localRedirect } from 'utils';

import Icon from '../Icon';

import { NavbarLinkProps } from './types';

const useStyles = createStyles(theme => ({
  link: {
    borderRadius: theme.radius.md,
    color: '#7b7b7b'
  },
  active: {
    '&, &:hover': {
      color: theme.colors.primary[5]
    }
  }
}));

function NavbarLink({ icon, label, active, link }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component="a"
        onClick={() => {
          localRedirect(link || '');
        }}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon name={icon} size="26px" />
      </UnstyledButton>
    </Tooltip>
  );
}

export default NavbarLink;
