import React from 'react';
import { Route } from 'react-router-dom';

export const PublicRoute = ({ component: Component, layout: Layout, layoutProps, ...rest }: any): any => {
  return (
    <Route
      {...rest}
      render={(props: any): any => {
        return (
          <Layout {...layoutProps} section="public">
            <Component {...props} {...rest} />
          </Layout>
        );
      }}
    />
  );
};
