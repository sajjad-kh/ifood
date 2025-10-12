// CreditDetail.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import PaginationButtons from '../PaginationButtons';
import Header from '../Header';
import { useCreditDetail } from '../../function/creditDetail/useCreditDetail';

const CreditDetail = ({ userId }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'fa';

  const {
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
    handleDownload
  } = useCreditDetail({ lang, userId });

  return (
    <div className="w-full min-h-screen bg-white rounded-lg flex flex-col p-2 sm:p-4">
      <Header />

      {/* فیلتر و دانلود */}
      <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-center gap-2 mb-2 text-sm">
      <div className="flex flex-wrap gap-2">
        <input
          type="date"
          value={date || ''}
          onChange={(e) => {
            setDate(e.target.value);
            localStorage.setItem('start-month', e.target.value);
          }}
          className="border rounded px-2 py-1 text-xs flex-1 sm:flex-none"
        />
        <input
          type="date"
          value={toDate || ''}
          onChange={(e) => {
            setToDate(e.target.value);
            localStorage.setItem('end-month', e.target.value);
          }}
          className="border rounded px-2 py-1 text-xs flex-1 sm:flex-none"
        />
      </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center bg-white text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50 transition text-xs"
            title="دانلود گزارش"
            onClick={handleDownload}
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
          <span className="text-gray-600 text-xs">{t("reportCreditUser")}</span>
        </div>
      </div>

      {/* جدول */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <p className="text-center p-4">{t("loading")}</p>
        ) : error ? (
          <p className="text-center p-4 text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs text-right min-w-[500px] sm:min-w-full">
              <thead className="bg-yellow-100 text-black">
                <tr>
                  <th className="p-2 w-[10%]">{t('day')}</th>
                  <th className="p-2 w-[10%]">{t('date')}</th>
                  <th className="p-2 w-[10%]">{t('clock')}</th>
                  <th className="p-2 w-[15%]">{t('inc/dec')}</th>
                  <th className="p-2 w-[55%]">{t('description')}</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">{t("noData")}</td>
                  </tr>
                ) : (
                  data.map((item, idx) => (
                    <tr key={idx} className="bg-gray-50 border-b border-gray-200">
                      <td className="p-2">{item.time?.split(' ')[0]}</td>
                      <td className="p-2">{item.time?.split(' ')[1]}</td>
                      <td className="p-2">{item.time?.split(' ')[2]}</td>
                      <td className={`p-2 ${String(item.amount).startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.amount}
                      </td>
                      <td className="p-2">{item.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* صفحه‌بندی */}
      {total > 1 && (
        <div className="p-3 border-t border-gray-200">
          <PaginationButtons maxPages={total} pageNumber={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default CreditDetail;
