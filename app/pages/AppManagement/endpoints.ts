import request, { ResponseError } from 'utils/request';

export function getUserDetails(): Promise<{} | { err: ResponseError }> {
  return request.GET({ endpoint: 'user-details', params: { type: 'user' } });
}

export function logout(): Promise<{} | { err: ResponseError }> {
  return request.POST({ endpoint: 'logout', params: { type: 'user' } });
}
