import { IUserDetails } from 'types';

export const getMappedProfileDetails = ({ country, city, ...rest }: IUserDetails) => {
  return {
    country: country || '',
    city: city || '',
    ...rest
  };
};
