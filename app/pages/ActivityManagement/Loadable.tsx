/**
 * Asynchronously loads the component for Activity Page
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import { LoadingIndicator } from 'components';

export const ActivityListManagement = loadable(() => import('./index-list'), {
  fallback: <LoadingIndicator visible />
});
export const ActivityDetailsManagement = loadable(() => import('./index-details'), {
  fallback: <LoadingIndicator visible />
});
export const ActivityParticipateManagement = loadable(() => import('./index-participate'), {
  fallback: <LoadingIndicator visible />
});
export const ActivitySubmittedManagement = loadable(() => import('./index-submitted'), {
  fallback: <LoadingIndicator visible />
});
