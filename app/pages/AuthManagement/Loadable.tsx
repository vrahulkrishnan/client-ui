/**
 * Asynchronously loads the component for AuthPage
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import { LoadingIndicator } from 'components';

export const LoginPageManagement = loadable(() => import('./index-login'), {
  fallback: <LoadingIndicator visible />
});
export const RegisterPageManagement = loadable(() => import('./index-register'), {
  fallback: <LoadingIndicator visible />
});
export const ForgotPasswordPageManagement = loadable(() => import('./index-forgot'), {
  fallback: <LoadingIndicator visible />
});
export const VerificationPageManagement = loadable(() => import('./index-verification'), {
  fallback: <LoadingIndicator visible />
});
export const ResetPasswordPageManagement = loadable(() => import('./index-reset'), {
  fallback: <LoadingIndicator visible />
});
