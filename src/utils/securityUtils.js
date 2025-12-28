// Security utilities for TestDashboard

export const SecurityConfig = {
  // کدهای دسترسی
  ACCESS_CODES: {
    MASTER: 'TEST2024',
    DEVELOPER: 'DEV2024', 
    ADMIN: 'ADMIN2024'
  },
  
  // تنظیمات امنیتی
  MAX_ATTEMPTS: 3,
  BLOCK_DURATION: 5 * 60 * 1000, // 5 دقیقه
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 ساعت
  
  // IP های مجاز (اختیاری - فقط برای محیط production)
  ALLOWED_IPS: [
    '127.0.0.1',
    'localhost',
    '192.168.1.0/24', // شبکه محلی
  ],
  
  // User Agent های مجاز (اختیاری)
  BLOCKED_USER_AGENTS: [
    'bot',
    'crawler',
    'spider',
    'scraper'
  ]
};

// چک کردن محیط توسعه
export const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === 'development' || 
         window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1';
};

// چک کردن User Agent
export const isValidUserAgent = (userAgent = navigator.userAgent) => {
  const ua = userAgent.toLowerCase();
  return !SecurityConfig.BLOCKED_USER_AGENTS.some(blocked => ua.includes(blocked));
};

// ایجاد browser fingerprint
export const createBrowserFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Browser fingerprint', 2, 2);
  
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvas: canvas.toDataURL(),
    timestamp: Date.now()
  };
  
  return btoa(JSON.stringify(fingerprint));
};

// چک کردن fingerprint
export const validateFingerprint = (storedFingerprint) => {
  if (!storedFingerprint) return true; // اولین بار
  
  try {
    const stored = JSON.parse(atob(storedFingerprint));
    const current = JSON.parse(atob(createBrowserFingerprint()));
    
    // چک کردن تغییرات مهم
    const criticalFields = ['userAgent', 'platform', 'screenResolution'];
    const hasChanges = criticalFields.some(field => stored[field] !== current[field]);
    
    return !hasChanges;
  } catch (error) {
    console.warn('Fingerprint validation error:', error);
    return false;
  }
};

// لاگ کردن تلاش‌های دسترسی
export const logAccessAttempt = (success, code, additionalInfo = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    success,
    code: success ? code : '***',
    userAgent: navigator.userAgent,
    url: window.location.href,
    fingerprint: createBrowserFingerprint().slice(0, 20) + '...',
    ...additionalInfo
  };
  
  const accessLogs = JSON.parse(localStorage.getItem('testDashboardAccessLog') || '[]');
  accessLogs.push(log);
  
  // فقط 50 تا آخر رو نگه دار
  const recentLogs = accessLogs.slice(-50);
  localStorage.setItem('testDashboardAccessLog', JSON.stringify(recentLogs));
  
  // در محیط development لاگ کن
  if (isDevelopmentEnvironment()) {
    console.log('Access attempt:', log);
  }
  
  return log;
};

// گرفتن آمار دسترسی
export const getAccessStats = () => {
  const logs = JSON.parse(localStorage.getItem('testDashboardAccessLog') || '[]');
  
  const stats = {
    totalAttempts: logs.length,
    successfulAttempts: logs.filter(log => log.success).length,
    failedAttempts: logs.filter(log => !log.success).length,
    lastAccess: logs.length > 0 ? logs[logs.length - 1].timestamp : null,
    uniqueSessions: [...new Set(logs.filter(log => log.success).map(log => log.fingerprint))].length
  };
  
  return stats;
};

// پاک کردن داده‌های امنیتی
export const clearSecurityData = () => {
  const keysToRemove = [
    'testDashboardAuth',
    'testDashboardAuthTime', 
    'testDashboardFingerprint',
    'testDashboardAccessLog',
    'testDashboardBlockedUntil'
  ];
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  console.log('🧹 Security data cleared');
};

// چک کردن وضعیت block
export const checkBlockStatus = () => {
  const blockedUntil = localStorage.getItem('testDashboardBlockedUntil');
  if (!blockedUntil) return { isBlocked: false };
  
  const blockTime = parseInt(blockedUntil);
  const currentTime = Date.now();
  
  if (currentTime < blockTime) {
    const remainingTime = Math.ceil((blockTime - currentTime) / 1000);
    return { 
      isBlocked: true, 
      remainingSeconds: remainingTime,
      remainingMinutes: Math.ceil(remainingTime / 60)
    };
  } else {
    localStorage.removeItem('testDashboardBlockedUntil');
    return { isBlocked: false };
  }
};

// تنظیم block
export const setBlock = (durationMs = SecurityConfig.BLOCK_DURATION) => {
  const blockUntil = Date.now() + durationMs;
  localStorage.setItem('testDashboardBlockedUntil', blockUntil.toString());
  
  logAccessAttempt(false, '', { 
    action: 'blocked',
    duration: durationMs,
    reason: 'too_many_attempts'
  });
};

// تولید کد دسترسی موقت (برای اشتراک گذاری ایمن)
export const generateTemporaryCode = (validForHours = 1) => {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  const expiresAt = Date.now() + (validForHours * 60 * 60 * 1000);
  
  const tempCodes = JSON.parse(localStorage.getItem('testDashboardTempCodes') || '{}');
  tempCodes[code] = expiresAt;
  
  // پاک کردن کدهای منقضی شده
  Object.keys(tempCodes).forEach(tempCode => {
    if (tempCodes[tempCode] < Date.now()) {
      delete tempCodes[tempCode];
    }
  });
  
  localStorage.setItem('testDashboardTempCodes', JSON.stringify(tempCodes));
  
  console.log(`🔑 Temporary code generated: ${code} (valid for ${validForHours}h)`);
  return { code, expiresAt };
};

// چک کردن کد موقت
export const validateTemporaryCode = (code) => {
  const tempCodes = JSON.parse(localStorage.getItem('testDashboardTempCodes') || '{}');
  
  if (tempCodes[code] && tempCodes[code] > Date.now()) {
    // کد معتبر است، حذفش کن (یکبار مصرف)
    delete tempCodes[code];
    localStorage.setItem('testDashboardTempCodes', JSON.stringify(tempCodes));
    return true;
  }
  
  return false;
};

export default {
  SecurityConfig,
  isDevelopmentEnvironment,
  isValidUserAgent,
  createBrowserFingerprint,
  validateFingerprint,
  logAccessAttempt,
  getAccessStats,
  clearSecurityData,
  checkBlockStatus,
  setBlock,
  generateTemporaryCode,
  validateTemporaryCode
};