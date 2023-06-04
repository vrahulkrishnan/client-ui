import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Title, Box, Typography, List } from 'components';
import { useGTM } from 'hooks';

import { StaticPageProps } from './types';
import messages from './messages';

const TermsManagement = ({ setPageTitle }: StaticPageProps) => {
  useGTM(messages.terms.title);
  useEffect(() => {
    if (setPageTitle) {
      setPageTitle(messages.terms.title);
    }
  }, [setPageTitle]);
  return (
    <>
      <Helmet titleTemplate={messages.terms.title} defaultTitle={messages.terms.title} title={messages.terms.title} />
      <Box sx={{ height: '100%' }} p="md">
        <Title order={3} weight={600} pb="md">
          {messages.terms.termsCondition.title}
        </Title>
        <List
          styles={{ itemWrapper: { display: 'inline-flex' } }}
          withPadding
          listStyleType="disc"
          size="sm"
          spacing="sm"
        >
          {messages.terms.termsCondition.content.map((item, ind) =>
            typeof item === 'string' ? (
              <List.Item key={item}>
                <Typography color="#7f7f7f">{item}</Typography>
              </List.Item>
            ) : (
              <List
                styles={{ itemWrapper: { display: 'inline-flex' } }}
                withPadding
                listStyleType="disc"
                key={ind}
                size="sm"
                spacing="sm"
              >
                {item.map(ite => (
                  <List.Item key={ite}>
                    <Typography color="#7f7f7f">{ite}</Typography>
                  </List.Item>
                ))}
              </List>
            )
          )}
        </List>
        <Title order={3} weight={600} pb="md" pt="lg">
          {messages.terms.tc.title}
        </Title>
        <List
          styles={{ itemWrapper: { display: 'inline-flex' } }}
          withPadding
          listStyleType="disc"
          size="sm"
          spacing="sm"
        >
          {messages.terms.tc.content.map((item, ind) => (
            <List.Item key={item}>
              <Typography color="#7f7f7f">{item}</Typography>
            </List.Item>
          ))}
        </List>
      </Box>
    </>
  );
};

export default TermsManagement;
