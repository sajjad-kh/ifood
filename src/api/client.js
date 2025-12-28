// client.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'x-requested-with': 'XMLHttpRequest',
  },
  timeout: 10000,
  withCredentials: true, // برای ارسال cookie سشن
});

// تابع برای آپدیت CSRF token
export const updateCSRFToken = (token) => {
  client.defaults.headers['x-csrf-token'] = token;
  console.log('🔄 CSRF Token updated in client:', token);
};

// تابع برای لود کردن CSRF token از localStorage در startup
export const loadCSRFToken = () => {
  const savedToken = localStorage.getItem('csrf_token');
  if (savedToken) {
    updateCSRFToken(savedToken);
    console.log('🔄 CSRF Token loaded from localStorage:', savedToken);
  }
};

// لود کردن token در startup
loadCSRFToken();

// فلگ برای غیرفعال کردن auto redirect در TestDashboard
let disableAutoRedirect = false;

export const setAutoRedirect = (enabled) => {
  disableAutoRedirect = !enabled;
  console.log('🔄 Auto redirect:', enabled ? 'enabled' : 'disabled');
};

// ✅ interceptor برای گرفتن فقط data
client.interceptors.response.use(
  (response) => {
    // چک کردن اگه HTML برگشت (یعنی session نداره)
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      // فقط اگه auto redirect فعال باشه ریدایرکت کن
      if (!disableAutoRedirect) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(new Error('Session expired'));
    }
    return response.data;
  },
  (error) => {
    // اگه 401 اومد، یعنی session نداره
    if (error.response?.status === 401) {
      // فقط اگه auto redirect فعال باشه ریدایرکت کن
      if (!disableAutoRedirect) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default client;
