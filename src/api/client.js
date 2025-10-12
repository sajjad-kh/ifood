// client.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    // 'Content-Type': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'x-csrf-token': 'tA9Z4GZi/uZB1JqwOFFu9Xfi8YhtD/jSrnIFE0L8jazAP6p8CuvYVV18Ul/X6MQuLz38YRSNvpLC+2chCQ0meQ==',
    'x-requested-with': 'XMLHttpRequest',
  },
  timeout: 10000
//   withCredentials: true, // برای کوکی یا سشن
});

// ✅ interceptor برای گرفتن فقط data
client.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default client;
