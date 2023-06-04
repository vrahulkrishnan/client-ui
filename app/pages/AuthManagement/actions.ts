import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { RegistrationFormTypes } from './types';

export const registerUser = (data: Omit<RegistrationFormTypes, 'confirmPassword'>, verificationLink: string) =>
  action(ActionTypes.REGISTER_USER, { ...data, verificationLink });
export const registerUserSuccess = (data: any) => action(ActionTypes.REGISTER_USER_SUCCESS, data);
export const registerUserFailed = (error: any) => action(ActionTypes.REGISTER_USER_FAILED, error);

export const emailVerification = (verificationCode: string) => action(ActionTypes.EMAIL_VERIFICATION, verificationCode);
export const emailVerificationSuccess = (response: any) => action(ActionTypes.EMAIL_VERIFICATION_SUCCESS, response);
export const emailVerificationFailed = (error: string) => action(ActionTypes.EMAIL_VERIFICATION_FAILED, error);

export const login = (loginData: { email: string; password: string; redirectPath: string }) =>
  action(ActionTypes.LOGIN, { ...loginData });
export const loginSuccess = (data: any) => action(ActionTypes.LOGIN_SUCCESS, data);
export const loginFailed = (error: any) => action(ActionTypes.LOGIN_FAILED, error);

export const forgotPassword = (data: { emailId: string; verificationLink: string }) =>
  action(ActionTypes.FORGOT_LOGIN_PASSWORD, data);
export const forgotPasswordSuccess = (response: string) => action(ActionTypes.FORGOT_LOGIN_PASSWORD_SUCCESS, response);
export const forgotPasswordFailed = (error: string) => action(ActionTypes.FORGOT_LOGIN_PASSWORD_FAILED, error);

export const forgotPasswordLinkVerify = (verificationCode: string) =>
  action(ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY, verificationCode);
export const forgotPasswordLinkVerifySuccess = (userId: string) =>
  action(ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY_SUCCESS, userId);
export const forgotPasswordLinkVerifyFailed = (error: string) =>
  action(ActionTypes.FORGOT_LOGIN_PASSWORD_LINK_VERIFY_FAILED, error);

export const resetUserPassword = (data: { password: string; userId: string }) =>
  action(ActionTypes.RESET_USER_PASSWORD, data);
export const resetUserPasswordSuccess = (response: string) => action(ActionTypes.RESET_USER_PASSWORD_SUCCESS, response);
export const resetUserPasswordFailed = (error: string) => action(ActionTypes.RESET_USER_PASSWORD_FAILED, error);

export const resetRedux = (...keys: string[]) => action(ActionTypes.RESET_REDUX, keys);
