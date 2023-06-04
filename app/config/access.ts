import { getCookie } from 'utils/storage';

export const hasLoginAccess = (): boolean => JSON.parse(getCookie('isClientUserLoggedIn') || 'false');
