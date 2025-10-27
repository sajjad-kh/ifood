import client from './client';

export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('utf8', '✓');
  // formData.append('authenticity_token', 'tA9Z4GZi/uZB1JqwOFFu9Xfi8YhtD/jSrnIFE0L8jazAP6p8CuvYVV18Ul/X6MQuLz38YRSNvpLC+2chCQ0meQ==');
  formData.append('device', 'reserve');
  formData.append('captcha', '');
  formData.append('user[email]', email);
  formData.append('user[password]', password);

  try {
    const response = await client.post('/users/sign_in?locale=fa', formData);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error Response:', error.response);
    throw error;
  }
};

export const logout = async () => {
  return client.delete('/users/sign_out');
};

export const checkSession = async () => {
  try {
    // یه API call ساده برای چک کردن session
    const response = await client.get('/fa/day?date=' + new Date().toISOString().split('T')[0]);
    return { loggedIn: true, data: response };
  } catch (error) {
    if (error.response?.status === 401) {
      return { loggedIn: false };
    }
    throw error;
  }
};
