import Axi from '@/services/interceptors/Axi';
import Cookies from 'js-cookie';

export const authApi = {
  login: async (data: { username: string; password: string; role: string }) => {
    console.log('Making login request to: /api/user/login', data); // Debug log
    try {
      const response = await Axi.post('/api/user/login', null, {
        params: {
          username: data.username,
          password: data.password,
          role: data.role,
        },
      });

      // Store token in cookies
      if (response.data?.token) {
        Cookies.set('auth_token', response.data.token, {
          expires: 7, // Cookie expires in 7 days
          secure: process.env.NODE_ENV === 'production', // Secure in production
          sameSite: 'strict',
        });
      }

      console.log('Login API response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Login API error:', error); // Debug log
      throw error;
    }
  },
  logout: async () => {
    const response = await Axi.get('/api/logout');
    Cookies.remove('auth_token');
    return response;
  },
};