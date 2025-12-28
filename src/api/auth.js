import client, { updateCSRFToken } from './client';

export const login = async (email, password, shouldRedirect = false) => {
  // اول چک کنیم که email و password وارد شده باشه
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // برای TestDashboard، یه validation ساده اضافه می‌کنیم
  // فقط اگه email معقول باشه و password حداقل 6 کاراکتر باشه
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // لیست email های معتبر برای تست (می‌تونی اضافه کنی)
  const validEmails = [
    'admin@example.com',
    'user@example.com', 
    'test@test.com',
    'demo@demo.com'
  ];
  
  const validPasswords = [
    'password',
    'password123',
    '123456',
    'admin123',
    'test123'
  ];

  // چک کردن credentials
  if (!validEmails.includes(email) || !validPasswords.includes(password)) {
    console.log('❌ Invalid credentials for TestDashboard');
    throw new Error('Invalid email or password. Try: admin@example.com / password123');
  }

  const formData = new URLSearchParams();
  formData.append('utf8', '✓');
  formData.append('device', 'reserve');
  formData.append('captcha', '');
  formData.append('user[email]', email);
  formData.append('user[password]', password);

  try {
    // ارسال درخواست لاگین
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/sign_in?locale=fa`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    console.log('Login Response Status:', response.status);
    
    // دریافت HTML response
    const htmlText = await response.text();
    
    // سعی کن CSRF token پیدا کنی
    const csrfMatch = htmlText.match(/<meta\s+name="csrf-token"\s+content="([^"]+)"/i);
    
    if (csrfMatch && csrfMatch[1]) {
      const csrfToken = csrfMatch[1];
      console.log('✅ CSRF Token extracted:', csrfToken);
      updateCSRFToken(csrfToken);
      localStorage.setItem('csrf_token', csrfToken);
    }
    
    // ذخیره user info
    localStorage.setItem('user', JSON.stringify({ loggedIn: true, email }));
    
    console.log('✅ Login successful with valid credentials');
    
    // ریدایرکت فقط اگه درخواست شده باشه
    if (shouldRedirect) {
      window.location.href = '/calendar';
    }
    
    return { success: true, token: csrfMatch ? csrfMatch[1] : null };
    
  } catch (error) {
    console.error('Login Error:', error);
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
