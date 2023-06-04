import request, { ResponseError } from 'utils/request';
import { getMappedProfileImage, getMappedProfileUpdate } from './mappings';

export function getActivityStatusList(restaurantId: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'activity/participated/user',
    params: { restaurantId, type: 'user' }
  });
}

export function getRestaurantList(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'restaurant/all',
    params: { type: 'user' }
  });
}

export function updateProfileDetails(data: any): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'update-user-details',
    body: getMappedProfileUpdate(data),
    params: { type: 'user' }
  });
}

export function updateProfileImage(file: File): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: 'user/update-user-image',
    body: getMappedProfileImage(file),
    params: { type: 'user' }
  });
}
