/**
 * Error Handler Utility for React Frontend
 * Handles all types of errors with bilingual support (EN/FA)
 */

// Error codes mapping with bilingual messages
export const ERROR_MESSAGES = {
  // Authentication & Authorization
  UNAUTHORIZED: {
    en: "You are not authorized to access this resource",
    fa: "شما مجاز به دسترسی به این منبع نیستید"
  },
  TOKEN_EXPIRED: {
    en: "Your session has expired. Please login again",
    fa: "نشست شما منقضی شده است. لطفا دوباره وارد شوید"
  },
  INVALID_CREDENTIALS: {
    en: "Invalid username or password",
    fa: "نام کاربری یا رمز عبور اشتباه است"
  },
  FORBIDDEN: {
    en: "You don't have permission to perform this action",
    fa: "شما اجازه انجام این عملیات را ندارید"
  },
  
  // User & Account
  USER_NOT_FOUND: {
    en: "User not found",
    fa: "کاربر یافت نشد"
  },
  USER_ALREADY_EXISTS: {
    en: "User already exists",
    fa: "کاربر از قبل وجود دارد"
  },
  EMAIL_ALREADY_EXISTS: {
    en: "Email address is already registered",
    fa: "این ایمیل قبلا ثبت شده است"
  },
  INVALID_EMAIL: {
    en: "Invalid email address",
    fa: "آدرس ایمیل نامعتبر است"
  },
  
  // Validation
  VALIDATION_ERROR: {
    en: "Validation error",
    fa: "خطای اعتبارسنجی"
  },
  REQUIRED_FIELD: {
    en: "This field is required",
    fa: "این فیلد الزامی است"
  },
  INVALID_INPUT: {
    en: "Invalid input",
    fa: "ورودی نامعتبر است"
  },
  INVALID_FORMAT: {
    en: "Invalid format",
    fa: "فرمت نامعتبر است"
  },
  
  // Resource
  NOT_FOUND: {
    en: "Resource not found",
    fa: "منبع مورد نظر یافت نشد"
  },
  ALREADY_EXISTS: {
    en: "Resource already exists",
    fa: "منبع از قبل وجود دارد"
  },
  DUPLICATE_ENTRY: {
    en: "Duplicate entry",
    fa: "ورودی تکراری"
  },
  
  // Server & Network
  INTERNAL_SERVER_ERROR: {
    en: "Internal server error. Please try again later",
    fa: "خطای سرور. لطفا بعدا تلاش کنید"
  },
  SERVICE_UNAVAILABLE: {
    en: "Service temporarily unavailable",
    fa: "سرویس موقتا در دسترس نیست"
  },
  NETWORK_ERROR: {
    en: "Network connection error",
    fa: "خطای اتصال به شبکه"
  },
  TIMEOUT: {
    en: "Request timeout. Please try again",
    fa: "زمان درخواست تمام شد. لطفا دوباره تلاش کنید"
  },
  
  // Database
  DATABASE_ERROR: {
    en: "Database error occurred",
    fa: "خطای پایگاه داده رخ داد"
  },
  
  // File & Upload
  FILE_TOO_LARGE: {
    en: "File size is too large",
    fa: "حجم فایل بیش از حد مجاز است"
  },
  INVALID_FILE_TYPE: {
    en: "Invalid file type",
    fa: "نوع فایل نامعتبر است"
  },
  UPLOAD_FAILED: {
    en: "File upload failed",
    fa: "آپلود فایل ناموفق بود"
  },
  
  // Rate Limiting
  TOO_MANY_REQUESTS: {
    en: "Too many requests. Please try again later",
    fa: "درخواست‌های زیاد. لطفا بعدا تلاش کنید"
  },
  
  // Payment
  PAYMENT_FAILED: {
    en: "Payment failed",
    fa: "پرداخت ناموفق بود"
  },
  INSUFFICIENT_BALANCE: {
    en: "Insufficient balance",
    fa: "موجودی کافی نیست"
  },
  
  // Default
  UNKNOWN_ERROR: {
    en: "An unexpected error occurred",
    fa: "خطای غیرمنتظره‌ای رخ داد"
  },
  BAD_REQUEST: {
    en: "Bad request",
    fa: "درخواست نامعتبر"
  }
};

// Error types categorization
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  VALIDATION: 'VALIDATION',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER',
  CLIENT: 'CLIENT',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Categorize error based on status code or error code
 */
const categorizeError = (statusCode, errorCode) => {
  if (!statusCode && !errorCode) return ERROR_TYPES.UNKNOWN;
  
  // Network errors
  if (statusCode === 0 || errorCode === 'NETWORK_ERROR' || errorCode === 'TIMEOUT') {
    return ERROR_TYPES.NETWORK;
  }
  
  // Authentication
  if (statusCode === 401 || ['UNAUTHORIZED', 'TOKEN_EXPIRED', 'INVALID_CREDENTIALS'].includes(errorCode)) {
    return ERROR_TYPES.AUTHENTICATION;
  }
  
  // Authorization
  if (statusCode === 403 || errorCode === 'FORBIDDEN') {
    return ERROR_TYPES.AUTHORIZATION;
  }
  
  // Not Found
  if (statusCode === 404 || errorCode?.includes('NOT_FOUND')) {
    return ERROR_TYPES.NOT_FOUND;
  }
  
  // Validation
  if (statusCode === 400 || statusCode === 422 || errorCode?.includes('VALIDATION') || errorCode?.includes('INVALID')) {
    return ERROR_TYPES.VALIDATION;
  }
  
  // Server errors
  if (statusCode >= 500) {
    return ERROR_TYPES.SERVER;
  }
  
  // Client errors
  if (statusCode >= 400 && statusCode < 500) {
    return ERROR_TYPES.CLIENT;
  }
  
  return ERROR_TYPES.UNKNOWN;
};

/**
 * Main error handler function
 * @param {Error|Object} error - Error object from API or JavaScript error
 * @param {string} language - Language preference ('en' or 'fa')
 * @returns {Object} Processed error object with bilingual messages
 */
export const handleError = (error, language = 'fa') => {
  // Default error structure
  const processedError = {
    code: null,
    message: null,
    messageEn: null,
    messageFa: null,
    type: ERROR_TYPES.UNKNOWN,
    statusCode: null,
    originalError: error
  };

  // Handle network errors (no response from server)
  if (!error.response && error.request) {
    processedError.code = 'NETWORK_ERROR';
    processedError.type = ERROR_TYPES.NETWORK;
    processedError.messageEn = ERROR_MESSAGES.NETWORK_ERROR.en;
    processedError.messageFa = ERROR_MESSAGES.NETWORK_ERROR.fa;
    processedError.message = language === 'en' ? processedError.messageEn : processedError.messageFa;
    return processedError;
  }

  // Handle timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    processedError.code = 'TIMEOUT';
    processedError.type = ERROR_TYPES.NETWORK;
    processedError.messageEn = ERROR_MESSAGES.TIMEOUT.en;
    processedError.messageFa = ERROR_MESSAGES.TIMEOUT.fa;
    processedError.message = language === 'en' ? processedError.messageEn : processedError.messageFa;
    return processedError;
  }

  // Extract error data from response
  const errorData = error.response?.data || error.data || error;
  const statusCode = error.response?.status || error.status || null;
  
  processedError.statusCode = statusCode;

  // Scenario 1: Backend sends code only
  if (errorData.code && !errorData.message && !errorData.messageEn) {
    processedError.code = errorData.code;
    const mappedMessages = ERROR_MESSAGES[errorData.code];
    
    if (mappedMessages) {
      processedError.messageEn = mappedMessages.en;
      processedError.messageFa = mappedMessages.fa;
    } else {
      // Fallback if code not in mapping
      processedError.messageEn = ERROR_MESSAGES.UNKNOWN_ERROR.en;
      processedError.messageFa = ERROR_MESSAGES.UNKNOWN_ERROR.fa;
    }
  }
  
  // Scenario 2: Backend sends code + Farsi message
  else if (errorData.code && errorData.message && !errorData.messageEn) {
    processedError.code = errorData.code;
    processedError.messageFa = errorData.message;
    
    // Try to get English from mapping
    const mappedMessages = ERROR_MESSAGES[errorData.code];
    processedError.messageEn = mappedMessages?.en || ERROR_MESSAGES.UNKNOWN_ERROR.en;
  }
  
  // Scenario 3: Backend sends code + both messages
  else if (errorData.code && errorData.message && errorData.messageEn) {
    processedError.code = errorData.code;
    processedError.messageFa = errorData.message;
    processedError.messageEn = errorData.messageEn;
  }
  
  // Scenario 4: Backend sends only message (no code)
  else if (errorData.message && !errorData.code) {
    processedError.code = 'CUSTOM_ERROR';
    processedError.messageFa = errorData.message;
    processedError.messageEn = errorData.messageEn || ERROR_MESSAGES.UNKNOWN_ERROR.en;
  }
  
  // Scenario 5: Standard HTTP errors without custom message
  else if (statusCode && !errorData.code && !errorData.message) {
    // Map status code to error code
    const statusCodeMap = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      422: 'VALIDATION_ERROR',
      429: 'TOO_MANY_REQUESTS',
      500: 'INTERNAL_SERVER_ERROR',
      503: 'SERVICE_UNAVAILABLE'
    };
    
    processedError.code = statusCodeMap[statusCode] || 'UNKNOWN_ERROR';
    const mappedMessages = ERROR_MESSAGES[processedError.code];
    processedError.messageEn = mappedMessages.en;
    processedError.messageFa = mappedMessages.fa;
  }
  
  // Scenario 6: JavaScript errors or unknown format
  else {
    processedError.code = 'UNKNOWN_ERROR';
    processedError.messageEn = error.message || ERROR_MESSAGES.UNKNOWN_ERROR.en;
    processedError.messageFa = ERROR_MESSAGES.UNKNOWN_ERROR.fa;
  }

  // Set the display message based on language preference
  processedError.message = language === 'en' ? processedError.messageEn : processedError.messageFa;
  
  // Categorize error type
  processedError.type = categorizeError(statusCode, processedError.code);

  return processedError;
};

/**
 * Get error message in specific language
 */
export const getErrorMessage = (error, language = 'fa') => {
  const processed = handleError(error, language);
  return processed.message;
};

/**
 * Check if error is of specific type
 */
export const isErrorType = (error, type) => {
  const processed = handleError(error);
  return processed.type === type;
};

/**
 * Log error (can be extended to send to logging service)
 */
export const logError = (error, context = {}) => {
  const processed = handleError(error);
  
  console.error('Error occurred:', {
    ...processed,
    context,
    timestamp: new Date().toISOString()
  });
  
  // TODO: Send to logging service (Sentry, LogRocket, etc.)
};

export default handleError;
