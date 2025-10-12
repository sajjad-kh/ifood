// DayCell.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const DayCell = ({ day, order, surveyComplete, isToday, isPast, isFuture, isEmpty }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  let cellBg = 'bg-white';
  if (isEmpty) {
    if (isPast) cellBg = 'bg-gray-200';
    else if (isToday) cellBg = 'bg-orange-100';
    else if (isFuture) cellBg = 'bg-green-100';
  }

  const limitedOrders = order?.slice(0, 4) || [];

  return (
    <div className={`relative border rounded-lg p-2 h-32 text-sm ${cellBg} flex flex-col justify-between`}>
      {/* عدد روز */}
      <div className={`absolute top-1 ${isRtl ? 'left-2' : 'right-2'} text-xs font-bold text-gray-700`}>
        {day}
      </div>

      {/* سفارشات */}
      <div className="flex-1 mt-4 overflow-hidden">
        {limitedOrders.length > 0 ? (
          <>
            {limitedOrders.map((item, index) => (
              <div key={index} className="truncate">
                {item.food_name} ({item.count})
              </div>
            ))}
            {order.length > 4 && <div className="text-gray-500">...</div>}
          </>
        ) : (
          <div className="text-gray-500 text-xs text-center mt-4">
            {t("noOrderForThisDay")}
          </div>
        )}
      </div>

      {/* ثبت امتیاز */}
      {!surveyComplete && (
        <div className={`absolute bottom-1 ${isRtl ? 'right-2' : 'left-2'} text-[10px] text-red-600`}>
          {t("rateSurvey")}
        </div>
      )}
    </div>
  );
};

export default DayCell;
