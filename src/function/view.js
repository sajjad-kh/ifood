/**
 * تبدیل کد رنگ HEX به RGBA
 */
export function hexToRgba(hex, alpha = 1) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * تبدیل عدد انگلیسی به فارسی
 */
export function persianNumber(num) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return String(num).replace(/\d/g, (d) => persianDigits[d]);
}

/**
 * Wrapper برای تبدیل تاریخ میلادی به شمسی با یک روز اضافه
 * استفاده مشابه: const { jy, jm, jd } = gregorianToJalaliPlusOne(2025, 9, 30)
 */
export function gregorianToJalaliPlusOne(gy, gm, gd) {
  const { jy, jm, jd } = require('../function/dateUtils').gregorianToJalali(gy, gm, gd + 1);
  return { jy, jm, jd };
}

// تبدیل تاریخ میلادی به شمسی
export function gregorianToJalali(gy, gm, gd) {
  // این تابع مثل تابع قبلی شما در dateUtils
  const g_d_m = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  let jy = (gy <= 1600) ? 0 : 979;
  gy -= (gy <= 1600) ? 621 : 1600;
  let days = 365*gy + Math.floor((gy+3)/4) - Math.floor((gy+99)/100) + Math.floor((gy+399)/400);
  for (let i=0;i<gm;i++) days += g_d_m[i];
  if (gm>2 && ((gy%4==0 && gy%100!=0) || (gy%400==0))) days++;
  days += gd-1;
  let j_np = Math.floor(days/12053);
  jy += 33*j_np;
  days %= 12053;
  jy += 4*Math.floor(days/1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days-1)/365);
    days = (days-1)%365;
  }
  const jm = (days < 186) ? 1 + Math.floor(days/31) : 7 + Math.floor((days-186)/30);
  const jd = 1 + ((days < 186) ? days%31 : (days-186)%30);
  return { jy, jm, jd };
}

// تبدیل تاریخ شمسی به میلادی
export function jalaliToGregorian(jy, jm, jd) {
  let gy, gm, gd;
  let sal_a, days;

  jy += 1595;
  days = -355668 + (365 * jy) + ~~(jy / 33) * 8 + ~~(((jy % 33) + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);

  gy = 400 * ~~(days / 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * ~~(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * ~~(days / 1461);
  days %= 1461;

  if (days > 365) {
    gy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const sal_m = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (gm = 1; gm <= 12 && days >= sal_m[gm]; gm++) days -= sal_m[gm];
  gd = days + 1;

  return { gy, gm, gd };
}

// بررسی وضعیت روز نسبت به امروز
export function getDayStatus(day, today) {
  const isToday = day.toDateString() === today.toDateString();
  const isPast = day < today;
  return { isToday, isPast };
}
