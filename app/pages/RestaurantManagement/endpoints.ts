import request, { ResponseError } from 'utils/request';

export function getRestaurantList(): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'restaurant',
    params: { type: 'user' }
  });
}
export function getRestaurant(id: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `restaurant/${id}`,
    params: { type: 'user' }
  });
}
export function getActivityList(restaurant: string): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: `restaurant/${restaurant}/with-activities`,
    params: { restaurant, type: 'user' }
  });
}
