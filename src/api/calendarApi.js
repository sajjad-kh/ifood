import client from "./client";

// گرفتن ماه بر اساس تاریخ
export const fetchCalendar = (lang, dateStr) => {
  // مثلا endpoint: /fa/?date=2025-09-01
  return client.get(`/${lang}/?date=${dateStr}`);
};
