import Cookies from 'js-cookie';

export const RemoveToken = () => {
  Cookies.remove('auth_token');
};