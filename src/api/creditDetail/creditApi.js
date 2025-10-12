import client from '../client';

export const fetchCreditReport = async ({ lang, date, toDate, page, limit }) => {
  const params = {
    date,
    toDate,
    "pagination[page_number]": page,
    "pagination[limit]": limit,
  };
  const res = await client.get(`${lang}/user_credit_report.json`, { params });
  return {
    data: res.credit_logs || [],
    total: res.max_page || 0,
  };
};

export const downloadCreditReport = ({ baseUrl, lang, userId, date }) => {
  const url = `${baseUrl}/${lang}/admin/users/${userId}/user_credit_report.xlsx?&date=${date}`;
  window.open(url, "_parent");
};
