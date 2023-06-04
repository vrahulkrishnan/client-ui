import { mapAPIDropdown } from 'utils';
import { DropdownAPIOption, ServerFileType } from 'types';
import { ACTIVITY_STATUS } from 'config';
import { ActivityFormTypes, IActivityResponse, StampFormTypes } from './types';

export const getMappedActivities = (data: IActivityResponse[]): ActivityFormTypes[] => {
  return (data || []).map(item => getMappedActivity(item));
};

const getMappedStatus = (status: IActivityResponse['progress']) =>
  ({
    'not participated': ACTIVITY_STATUS.TODO,
    pending: ACTIVITY_STATUS.PENDING,
    approved: ACTIVITY_STATUS.APPROVED,
    rejected: ACTIVITY_STATUS.REJECTED
  }[status || ''] || ACTIVITY_STATUS.TODO);

export const getMappedActivity = (data: IActivityResponse): ActivityFormTypes => {
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
    progress: getMappedStatus(data.progress),
    galleryImages: reducedImage?.galleryImages
  };
};

export const getMappedRestaurants = (data: DropdownAPIOption[]) => {
  return data.map(item => mapAPIDropdown(item));
};

export const getMappedStampedForm = (data: StampFormTypes) => {
  const formData = new FormData();
  if (data.image) {
    formData.append('image', data.image);
  }
  return formData;
};
