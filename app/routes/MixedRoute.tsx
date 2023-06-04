import React from 'react';
import { Route } from 'react-router-dom';

export const MixedRoute = ({ component: Component, layout: Layout, layoutProps, section, ...rest }: any): any => {
  return (
    <Route
      {...rest}
      render={(props: any): any => {
        return (
          <Layout {...layoutProps} section={section}>
            <Component {...props} {...rest} />
          </Layout>
        );
      }}
    />
  );
};
