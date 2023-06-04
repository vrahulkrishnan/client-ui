import { mapAPIDropdown } from 'utils';
import { ServerFileType } from 'types';
import { IActivity, IActivityResponse, IRestaurant, IRestaurantResponse } from './types';

export const getMappedActivities = (data: IActivityResponse[]): IActivity[] => {
  return (data || []).map(item => getMappedActivity(item));
};

export const getMappedActivity = (data: IActivityResponse): IActivity => {
  const reducedImage = (data.images || []).reduce(
    (acc, it) => (it.isMainImage ? { ...acc, mainImage: it } : { ...acc, galleryImages: [...acc.galleryImages, it] }),
    {
      mainImage: {} as ServerFileType,
      galleryImages: []
    }
  );
  return {
    id: data?.id || '',
    title: data?.title || '',
    restaurant: mapAPIDropdown(data?.restaurant),
    description: data?.description || '',
    mainImage: reducedImage.mainImage,
    galleryImages: reducedImage?.galleryImages || []
  };
};

export const getMappedRestaurants = (data: IRestaurantResponse[]): IRestaurant[] => {
  return (data || []).map(item => getMappedRestaurant(item));
};

export const getMappedRestaurant = (data: IRestaurantResponse): IRestaurant => {
  const reducedImage = (data.images || []).reduce(
    (acc, it) => (it.isMainImage ? { ...acc, mainImage: it } : { ...acc, galleryImages: [...acc.galleryImages, it] }),
    {
      mainImage: {} as ServerFileType,
      galleryImages: []
    }
  );
  return {
    id: data?.id || '',
    name: data?.name || '',
    description: data?.description || '',
    images: data.images || [],
    mainImage: reducedImage.mainImage,
    galleryImages: reducedImage.galleryImages
  };
};
