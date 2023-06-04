/**
 * Asynchronously loads the component for Static Page
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import { LoadingIndicator } from 'components';

export const HomeManagement = loadable(() => import('./index-home'), {
  fallback: <LoadingIndicator visible />
});
export const PrivacyPolicyManagement = loadable(() => import('./index-privacy'), {
  fallback: <LoadingIndicator visible />
});
export const TermsManagement = loadable(() => import('./index-terms'), {
  fallback: <LoadingIndicator visible />
});
export const ClientManagement = loadable(() => import('./index-client'), {
  fallback: <LoadingIndicator visible />
});
