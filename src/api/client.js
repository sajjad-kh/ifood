// client.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'x-csrf-token': 'Q45FvdRmX53N7j26aLjMV8JwsoIAhm+UR3jISYwlm3ClMmabfNzUNC7XKlaY9ASosPLqbP/fItgN5PsayYDewQ==',
    'x-requested-with': 'XMLHttpRequest',
  },
  timeout: 10000,
  withCredentials: true, // برای ارسال cookie سشن
});

// ✅ interceptor برای گرفتن فقط data
client.interceptors.response.use(
  (response) => {
    // چک کردن اگه HTML برگشت (یعنی session نداره)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      // session نداره، پاک کن و به لاگین برو
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired'));
    }
    return response.data;
  },
  (error) => {
    // اگه 401 اومد، یعنی session نداره
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
