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
        console.log('Token stored in cookie:', response.data.token); // Debug log
      } else {
        console.warn('No token received in response:', response.data); // Debug log
      }

      console.log('Login API response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Login API error:', error); // Debug log
      throw error; // Let the caller handle the error
    }
  },
  logout: async () => {
    try {
      const response = await Axi.get('/api/logout');
      Cookies.remove('auth_token');
      console.log('Logout successful, token removed'); // Debug log
      return response.data;
    } catch (error) {
      console.error('Logout API error:', error); // Debug log
      Cookies.remove('auth_token'); // Remove token even if logout fails
      throw error;
    }
  },
};