
/**
 * تبدیل تاریخ میلادی به شمسی
 * ورودی: gy: سال میلادی, gm: ماه میلادی (1-12), gd: روز میلادی
 * خروجی: { jy: سال شمسی, jm: ماه شمسی, jd: روز شمسی }
 */
export function gregorianToJalali(gy, gm, gd) {
  const g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
  let jy;
  if (gy > 1600) {
    jy = 979;
    gy -= 1600;
  } else {
    jy = 0;
    gy -= 621;
  }

  let gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = 365*gy + Math.floor((gy2+3)/4) - Math.floor((gy2+99)/100) + Math.floor((gy2+399)/400) - 80 + gd + g_d_m[gm-1];

  jy += 33 * Math.floor(days/12053);
  days %= 12053;
  jy += 4 * Math.floor(days/1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days-1)/365);
    days = (days-1)%365;
  }

  let jm = (days < 186) ? 1 + Math.floor(days/31) : 7 + Math.floor((days-186)/30);
  let jd = 1 + ((days < 186) ? days % 31 : (days-186) % 30);

  return { jy, jm, jd };
}
