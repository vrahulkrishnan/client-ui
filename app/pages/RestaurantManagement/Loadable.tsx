/**
 * Asynchronously loads the component for Restaurant Page
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import { LoadingIndicator } from 'components';

export const RestaurantListManagement = loadable(() => import('./index-list'), {
  fallback: <LoadingIndicator visible />
});
export const RestaurantDetailsManagement = loadable(() => import('./index-details'), {
  fallback: <LoadingIndicator visible />
});
