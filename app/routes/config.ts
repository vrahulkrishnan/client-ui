import {
  LoginPageManagement,
  RegisterPageManagement,
  ResetPasswordPageManagement,
  ForgotPasswordPageManagement,
  HomeManagement,
  PrivacyPolicyManagement,
  TermsManagement,
  ClientManagement,
  VerificationPageManagement,
  ActivityListManagement,
  ActivityDetailsManagement,
  ActivityParticipateManagement,
  ActivitySubmittedManagement,
  ActivityStatusManagement,
  RestaurantListManagement,
  RestaurantDetailsManagement,
  WelcomePageManagement,
  ProfileViewManagement,
  ProfileEditManagement
} from 'pages';

import { iconMapKeys } from '../.icons';
interface appRoutesType {
  path: string;
  icon: iconMapKeys;
  label: string;
  private: boolean;
}
export const appRoutes: appRoutesType[] = [
  { path: '/', icon: 'home', label: 'Home', private: false },
  { path: '/restaurants', icon: 'restaurant', label: 'Restaurants', private: false },
  { path: '/activities', icon: 'activities', label: 'Activities', private: false },
  { path: '/profile', icon: 'profile', label: 'Profile', private: true }
];

export const pageRoutes = {
  public: [
    { path: '/', component: HomeManagement },
    { path: '/home', component: HomeManagement },
    { path: '/register', component: RegisterPageManagement },
    { path: '/reset-password', component: ResetPasswordPageManagement },
    { path: '/reset-password/:verificationId', component: ResetPasswordPageManagement },
    { path: '/forgot-password', component: ForgotPasswordPageManagement },
    { path: '/verification', component: VerificationPageManagement },
    { path: '/verification/:verificationId', component: VerificationPageManagement },
    { path: '/login', component: LoginPageManagement }
  ],
  private: [
    { path: '/welcome', component: WelcomePageManagement },
    { path: '/activities/:id/participate', component: ActivityParticipateManagement },
    { path: '/profile', component: ProfileViewManagement },
    { path: '/profile/edit/:userId', component: ProfileEditManagement },
    { path: '/activities/submitted', component: ActivitySubmittedManagement },
    { path: '/profile', component: HomeManagement },
    { path: '/profile/activity-status', component: ActivityStatusManagement }
  ],
  mixed: [
    { path: '/activities', component: ActivityListManagement },
    { path: '/activities/:id', component: ActivityDetailsManagement },
    { path: '/restaurants', component: RestaurantListManagement },
    { path: '/restaurants/:id', component: RestaurantDetailsManagement },
    { path: '/privacy-policy', component: PrivacyPolicyManagement },
    { path: '/terms', component: TermsManagement },
    { path: '/about', component: ClientManagement }
  ],
  error: [{ path: '*', component: HomeManagement }]
};
