import { useState, useEffect } from 'react';
import { fetchCreditReport, downloadCreditReport } from '../../api/creditDetail/creditApi';

export const useCreditDetail = ({ lang, userId, itemsPerPage = 10 }) => {
  const [date, setDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📌 گرفتن دیتا
  const loadData = async (page = 1) => {
    if (!date || !toDate) return;
    try {
      setLoading(true);
      setError(null);
      const { data, total } = await fetchCreditReport({
        lang,
        date,
        toDate,
        page,
        limit: itemsPerPage,
      });
      setData(data);
      setTotal(total);
    } catch (err) {
      setError(err.message || 'خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  // 📌 دانلود گزارش
  const handleDownload = () => {
    if (!date || !toDate) return;
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    downloadCreditReport({ baseUrl, lang, userId, date });
  };

  // 📌 بارگذاری اولیه تاریخ‌ها
  useEffect(() => {
    const start = localStorage.getItem('start-month');
    const end = localStorage.getItem('end-month');
    setDate(start);
    setToDate(end);
  }, []);

  // 📌 وقتی date یا صفحه تغییر کرد، API call کن
  useEffect(() => {
    loadData(currentPage);
  }, [date, toDate, currentPage]);

  return {
    date,
    toDate,
    data,
    total,
    currentPage,
    loading,
    error,
    setDate,
    setToDate,
    setCurrentPage,
    handleDownload,
  };
};
