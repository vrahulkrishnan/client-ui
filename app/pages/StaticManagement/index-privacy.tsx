import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Title, Box, Typography, List } from 'components';
import { useGTM } from 'hooks';

import { StaticPageProps } from './types';
import messages from './messages';

const PrivacyPolicyManagement = ({ setPageTitle }: StaticPageProps) => {
  useGTM(messages.privacy.title);
  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.privacy.title);
    }
  }, [setPageTitle]);
  return (
    <>
      <Helmet
        titleTemplate={messages.privacy.title}
        defaultTitle={messages.privacy.title}
        title={messages.privacy.title}
      />
      <Box sx={{ height: '100%' }} p="md">
        <Title order={3} weight={600} pb="md" color="primary">
          {messages.privacy.heading}
        </Title>
        <List listStyleType="none">
          <List.Item>
            <Typography color="#7f7f7f" pb="md">
              {messages.privacy.introduction}
            </Typography>
          </List.Item>
          {messages.privacy.policyPageContent.map((item, i) => (
            <List.Item key={i}>
              <>
                <Title order={4} weight={600} pb="md">
                  {item.title}
                </Title>
                {item.content.map((it, ind) => (
                  <Typography color="#7f7f7f" key={ind} pb="md">
                    {it}
                  </Typography>
                ))}
              </>
            </List.Item>
          ))}
        </List>
      </Box>
    </>
  );
};

export default PrivacyPolicyManagement;
