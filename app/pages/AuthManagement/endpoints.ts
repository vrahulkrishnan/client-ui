import request, { ResponseError } from 'utils/request';
import { RegistrationFormTypes } from './types';

export function registerUser(
  data: Omit<RegistrationFormTypes, 'confirmPassword'>
): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: 'register', body: { ...data }, params: { type: 'user' } });
}

export function postLogin(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: 'login', body: { ...data }, params: { type: 'user' } });
}

export function resetPassword(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: `reset-password/${data.userId}`,
    body: { password: data.password }
  });
}

export function forgotPassword(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: `forgot-password`, body: { ...data }, params: { type: 'user' } });
}

export function resetPasswordLinkVerification(link: string): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: `verify-user/${link}` });
}

export function linkVerification(data: string): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: `verify-user/${data}`, params: { type: 'user' } });
}
