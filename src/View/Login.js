import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const redirectUrl = `${window.location.origin}/calendar`;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${process.env.REACT_APP_API_BASE_URL}/users/sign_in?locale=fa&redirect_url=${encodeURIComponent(
      redirectUrl
    )}`;

    const fields = {
      utf8: '✓',
      captcha: '',
      'user[email]': email,
      'user[password]': password,
    };

    Object.keys(fields).forEach((key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/image/back.png')` }}
    >
      <div className="bg-white p-9 rounded-lg shadow-md w-full max-w-md">
        {/* هدر */}
        <div className="flex flex-row w-full px-9 items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 text-right">ورود</h1>
          <img className="w-20" src="/image/irancell.png" alt="Irancell" />
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-4 px-9 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ایمیل و رمز عبور خود را وارد کنید
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="نام کاربری یا ایمیل خود را وارد کنید"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* دکمه اصلی ورود */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-irancell text-white py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>

          {/* خط جداکننده */}
          <hr className="my-4 border-gray-300" />

          {/* دکمه‌های ورود با کارت و SSO */}
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="text-irancell w-full py-2 px-4 font-bold bg-white border border-irancell rounded-lg text-gray-800 hover:bg-irancell hover:text-white transition-colors"
            >
              ورود با کارت
            </button>

            <button
              type="button"
              className="text-irancell w-full py-2 px-4 font-bold bg-white border border-irancell rounded-lg text-gray-800 hover:bg-irancell hover:text-white transition-colors"
            >
              ورود با SSO
            </button>
          </div>

          {/* متن پایین کوچک و ریسپانسیو */}
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-sm text-gray-500 text-center mt-4">
            تمامی حقوق برای ایرانسل محفوظ است. |{' '}
            <a
              href="/users/sign_in?locale=en"
              className="text-irancell hover:underline"
            >
              English
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
