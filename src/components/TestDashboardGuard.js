import React, { useState, useEffect } from 'react';

const TestDashboardGuard = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessAttempts, setAccessAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showAdvancedSecurity, setShowAdvancedSecurity] = useState(false);
  
  // کدهای دسترسی مختلف
  const ACCESS_CODES = {
    MASTER: 'TEST2024',
    DEVELOPER: 'DEV2024',
    ADMIN: 'ADMIN2024'
  };

  useEffect(() => {
    // چک کردن authorization از localStorage
    const savedAuth = localStorage.getItem('testDashboardAuth');
    const savedTime = localStorage.getItem('testDashboardAuthTime');
    
    if (savedAuth && savedTime) {
      const authTime = parseInt(savedTime);
      const currentTime = Date.now();
      const hoursPassed = (currentTime - authTime) / (1000 * 60 * 60);
      
      // اگر کمتر از 24 ساعت گذشته باشه، دسترسی بده
      if (hoursPassed < 24 && Object.values(ACCESS_CODES).includes(savedAuth)) {
        setIsAuthorized(true);
      } else {
        // اگر بیشتر از 24 ساعت گذشته، پاک کن
        localStorage.removeItem('testDashboardAuth');
        localStorage.removeItem('testDashboardAuthTime');
      }
    }

    // چک کردن IP و browser fingerprint (ساده)
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled
    };
    
    const fingerprint = btoa(JSON.stringify(browserInfo));
    const savedFingerprint = localStorage.getItem('testDashboardFingerprint');
    
    if (savedFingerprint && savedFingerprint !== fingerprint) {
      console.warn('🚨 Browser fingerprint mismatch detected');
      localStorage.removeItem('testDashboardAuth');
      localStorage.removeItem('testDashboardAuthTime');
      setIsAuthorized(false);
    } else if (!savedFingerprint) {
      localStorage.setItem('testDashboardFingerprint', fingerprint);
    }
  }, []);

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      alert('دسترسی شما به دلیل تلاش‌های ناموفق محدود شده است. لطفاً بعداً تلاش کنید.');
      return;
    }
    
    const isValidCode = Object.values(ACCESS_CODES).includes(accessCode);
    
    if (isValidCode) {
      setIsAuthorized(true);
      setAccessAttempts(0);
      localStorage.setItem('testDashboardAuth', accessCode);
      localStorage.setItem('testDashboardAuthTime', Date.now().toString());
      
      // Log successful access
      console.log('✅ Access granted to TestDashboard at', new Date().toLocaleString());
      
      // ذخیره access log
      const accessLog = JSON.parse(localStorage.getItem('testDashboardAccessLog') || '[]');
      accessLog.push({
        timestamp: new Date().toISOString(),
        code: accessCode,
        userAgent: navigator.userAgent,
        success: true
      });
      localStorage.setItem('testDashboardAccessLog', JSON.stringify(accessLog.slice(-10))); // فقط 10 تا آخر
      
    } else {
      const newAttempts = accessAttempts + 1;
      setAccessAttempts(newAttempts);
      
      // Log failed attempt
      const accessLog = JSON.parse(localStorage.getItem('testDashboardAccessLog') || '[]');
      accessLog.push({
        timestamp: new Date().toISOString(),
        code: accessCode,
        userAgent: navigator.userAgent,
        success: false
      });
      localStorage.setItem('testDashboardAccessLog', JSON.stringify(accessLog.slice(-10)));
      
      if (newAttempts >= 3) {
        setIsBlocked(true);
        setTimeout(() => {
          setIsBlocked(false);
          setAccessAttempts(0);
        }, 300000); // 5 دقیقه block
        alert('تلاش‌های ناموفق زیاد! دسترسی برای 5 دقیقه محدود شد.');
      } else {
        alert(`کد اشتباه است. ${3 - newAttempts} تلاش باقی مانده.`);
      }
      setAccessCode('');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setAccessCode('');
    setAccessAttempts(0);
    localStorage.removeItem('testDashboardAuth');
    localStorage.removeItem('testDashboardAuthTime');
    console.log('🚪 Logged out from TestDashboard');
  };

  const clearAllData = () => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید تمام داده‌های ذخیره شده را پاک کنید؟')) {
      localStorage.removeItem('testDashboardAuth');
      localStorage.removeItem('testDashboardAuthTime');
      localStorage.removeItem('testDashboardFingerprint');
      localStorage.removeItem('testDashboardAccessLog');
      setIsAuthorized(false);
      alert('تمام داده‌ها پاک شد.');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Dashboard</h1>
            <p className="text-gray-600">صفحه محافظت شده</p>
            <p className="text-sm text-gray-500 mt-2">فقط برای استفاده مجاز</p>
          </div>
          
          <form onSubmit={handleAccessSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                کد دسترسی
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="کد دسترسی را وارد کنید"
                disabled={isBlocked}
                required
              />
            </div>
            
            {accessAttempts > 0 && !isBlocked && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                ❌ کد اشتباه است. {3 - accessAttempts} تلاش باقی مانده.
              </div>
            )}
            
            {isBlocked && (
              <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm text-center">
                🚫 دسترسی محدود شده. لطفاً 5 دقیقه صبر کنید.
              </div>
            )}
            
            <button
              type="submit"
              disabled={isBlocked}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isBlocked ? '🚫 محدود شده' : '🔓 ورود'}
            </button>
          </form>
          
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setShowAdvancedSecurity(!showAdvancedSecurity)}
              className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showAdvancedSecurity ? '▲ پنهان کردن تنظیمات' : '▼ تنظیمات پیشرفته'}
            </button>
            
            {showAdvancedSecurity && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <button
                  onClick={clearAllData}
                  className="w-full text-sm bg-red-100 text-red-700 py-2 px-3 rounded hover:bg-red-200 transition-colors"
                >
                  🗑️ پاک کردن تمام داده‌ها
                </button>
                <div className="text-xs text-gray-500 text-center">
                  <p>Session timeout: 24 ساعت</p>
                  <p>Max attempts: 3</p>
                  <p>Block duration: 5 دقیقه</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
            <p>⚠️ این صفحه فقط برای تست و توسعه است</p>
            <p>🚫 دسترسی غیرمجاز ممنوع</p>
            <p className="text-gray-400">Protected by security guard</p>
          </div>
        </div>
      </div>
    );
  }

  // اگر authorized هست، children رو نشون بده با یه header امنیتی
  return (
    <div>
      <div className="bg-green-100 border-b border-green-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-green-800">
            <span>🔓</span>
            <span>Authorized Access</span>
            <span className="text-green-600">•</span>
            <span>Session expires in 24h</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
          >
            🚪 خروج
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default TestDashboardGuard;