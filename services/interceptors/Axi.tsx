import axios from 'axios';
import nookies from 'nookies';
import { toast } from 'sonner';
import { RemoveToken } from '../handlers/TokenHandler';

const Axi = axios.create({
  baseURL: '', // Use relative paths to leverage Next.js rewrites
  headers: {
    'Content-Type': 'application/json',
  },
});

Axi.interceptors.request.use(
  (config) => {
    const cookies = nookies.get();
    const token = cookies.auth_token; // Match cookie name from authApi
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization header with token:', token); // Debug log
    } else {
      console.log('No auth_token found in cookies'); // Debug log
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error); // Debug log
    return Promise.reject(error);
  }
);

Axi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const url = error.config?.url;
    console.error('Response error:', { url, status: error.response?.status, data: error.response?.data }); // Debug log
    if (error.response?.status === 404) {
      console.log('Redirecting to /404 due to 404 error');
      window.location.href = '/404';
    }
    if (error.response?.status === 401 && url !== '/api/user/login') {
      toast.info('Session expired. Redirecting to login...');
      RemoveToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Axi;