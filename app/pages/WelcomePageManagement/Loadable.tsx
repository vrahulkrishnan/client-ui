/**
 * Asynchronously loads the component for Welcome
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import { LoadingIndicator } from 'components';

export const WelcomePageManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});
