import { mapAPIDropdown } from 'utils';
import { DropdownAPIOption } from 'types';
import { IActivity, IActivityResponse } from './types';

export const getMappedActivities = (data: IActivityResponse[]): IActivity[] => {
  return (data || []).map(item => getMappedActivity(item));
};

export const getMappedActivity = (data: IActivityResponse): IActivity => {
  return {
    id: data?.activity?.id || '',
    title: data?.activity?.title || '',
    description: data?.activity?.description || '',
    image: data.image,
    status: data.status
  };
};

export const getMappedRestaurants = (data: DropdownAPIOption[]) => {
  return [{ label: 'All', value: 'all' }, ...data.map(item => mapAPIDropdown(item))];
};

export const getMappedProfileImage = (file: File) => {
  const formData = new FormData();
  if (file instanceof File) {
    formData.append('userImage', file);
  }
  return formData;
};

export const getMappedProfileUpdate = ({ country, city, participatedActivityPercent, ...rest }) => {
  return {
    country: country || '',
    city: city || '',
    ...rest
  };
};
