
import axios from 'axios';
import nookies from 'nookies';
import { RemoveToken } from '../handlers/TokenHandler';
import { toast } from 'sonner';

const Axi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

Axi.interceptors.request.use(
    (config) => {
        const cookies = nookies.get();
        const token = cookies.token;
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
        if (error.response?.status === 401 && url !== '/login') {
            toast.info('Session expired. Redirecting to login...')
            RemoveToken();
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default Axi
