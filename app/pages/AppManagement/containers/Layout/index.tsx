import { Menu, useMantineTheme } from '@mantine/core';
import { AppShell, Group, ActionIcon, Header, Footer, Icon, Typography, NavbarLink } from 'components';
import { hasLoginAccess } from 'config';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { appRoutes } from 'routes';

import * as Actions from '../../actions';

import { LayoutProps } from './types';

const Layout = ({ pageTitle, children, section }: LayoutProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useMantineTheme();
  const isLoggedIn = hasLoginAccess();
  const links = appRoutes
    .filter(it => (it.private ? isLoggedIn : true))
    .map((link, index) =>
      index === 0 ? (
        <NavbarLink {...link} link={link.path} key={link.label} active={location.pathname === '/'} />
      ) : (
        <NavbarLink {...link} link={link.path} key={link.label} active={location.pathname.includes(link.path)} />
      )
    );

  const handleLogout = () => {
    dispatch(Actions.logout());
  };

  return (
    <AppShell
      styles={{ main: { paddingLeft: 0, paddingRight: 0, ...(section === 'public' && { paddingTop: 0 }) } }}
      header={
        section !== 'public' ? (
          <Header sx={{ border: 'none', background: '#f6f6f6' }} height={75}>
            <Group align="center" position="apart" py="xl" px="md" noWrap>
              <ActionIcon
                sx={theme => ({ background: theme.white })}
                size="lg"
                variant="filled"
                radius="md"
                onClick={() => history.goBack()}
              >
                <Icon name="chevron-left" size="18px" color={theme.colors.primary[5]} />
              </ActionIcon>

              <Typography color="#7b7b7b" size="md" weight={500} lineClamp={1} sx={{ maxWidth: '45%' }}>
                {pageTitle}
              </Typography>
              <Group spacing={12}>
                <Menu width={200} withArrow position="bottom" shadow="md">
                  <Menu.Target>
                    <ActionIcon>
                      <Icon name="menu" size="20px" color="#7b7b7b" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item component="a" href="/about">
                      About Client
                    </Menu.Item>
                    <Menu.Item component="a" href="/privacy-policy">
                      Privacy Policy
                    </Menu.Item>
                    <Menu.Item component="a" href="/terms">
                      Terms and Conditions
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                {isLoggedIn && (
                  <ActionIcon size="lg" variant="subtle" {...(isLoggedIn && { onClick: handleLogout })}>
                    <Icon name="logout" size="22px" color="#7b7b7b" />
                  </ActionIcon>
                )}
              </Group>
            </Group>
          </Header>
        ) : undefined
      }
      footer={
        <Footer sx={{ border: 'none', background: '#f6f6f6' }} height={75}>
          <Group align="center" position="apart" px="xl" sx={{ height: '100%' }}>
            {links}
          </Group>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
