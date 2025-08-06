import axios from 'axios';
import nookies from 'nookies';
import { toast } from 'sonner';
import { RemoveToken } from '../handlers/TokenHandler';

const Axi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axi.interceptors.request.use(
  (config) => {
    const cookies = nookies.get();
    const token = cookies.auth_token; // Match the cookie name used in authApi
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const url = error.config?.url;
    if (error.response?.status === 404) {
      window.location.href = '/404';
    }
    if (error.response?.status === 401 && url !== '/user/login') {
      toast.info('Session expired. Redirecting to login...');
      RemoveToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Axi;