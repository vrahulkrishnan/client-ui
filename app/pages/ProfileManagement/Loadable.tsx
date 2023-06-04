/**
 * Asynchronously loads the component for Profile Page
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import { LoadingIndicator } from 'components';

export const ActivityStatusManagement = loadable(() => import('./index-activity-status'), {
  fallback: <LoadingIndicator visible />
});

export const ProfileViewManagement = loadable(() => import('./index-view'), {
  fallback: <LoadingIndicator visible />
});

export const ProfileEditManagement = loadable(() => import('./index-edit'), {
  fallback: <LoadingIndicator visible />
});
