import request, { ResponseError } from 'utils/request';
import { StampFormTypes } from './types';
import * as Mappings from './mappings';

export function getActivityList(restaurant: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `restaurant/${restaurant}/with-activities`,
    params: { type: 'user' }
  });
}

export function getRestaurantList(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'restaurant/all',
    params: { type: 'user' }
  });
}

export function getActivity(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `activity/${id}`,
    params: { type: 'user' }
  });
}

export function stampPassport(data: StampFormTypes): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: `activity/enroll/${data.id}`,
    body: Mappings.getMappedStampedForm(data),
    params: { type: 'user' }
  });
}
