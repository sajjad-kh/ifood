import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCheck } from "@fortawesome/free-solid-svg-icons";
import { hexToRgba, gregorianToJalali } from "../../function/view";
import { persion } from "../persian";

const DayCell = ({
  idx,
  startDay,
  data,
  days,
  todayStr,
  baseDate,
  localToday,
  orderByDay,
  meal,
  onClick,
}) => {
  const isFirstRow = idx < 7;
  const weekDayName = days[idx % 7];

  let dayNumber, cellDate = null;
  let isHoliday = false, isToday = false, isPast = false;
  let extraClass = "", orderData = null, isCurrentMonth = false;

  if (idx < startDay) {
    dayNumber = (data.pre_month_days || 0) - startDay + idx + 1;
    extraClass = "text-gray-400 bg-gray-50"; 
  } else if (idx < startDay + data.month_days) {
    dayNumber = idx - startDay + 1;
    isCurrentMonth = true;

    const dateCopy = new Date(baseDate);
    dateCopy.setDate(baseDate.getDate() + dayNumber);
    cellDate = dateCopy.toISOString().split("T")[0];

    isHoliday = data.off_days.includes(cellDate);
    isToday = cellDate === todayStr;
    isPast = new Date(cellDate) < localToday;
    orderData = orderByDay?.[dayNumber] || null;

    extraClass = isHoliday
      ? "bg-gray-100"
      : isToday
      ? "bg-white border border-orange-400"
      : isPast
      ? "bg-gray-100/50"
      : "bg-white";
  } else {
    dayNumber = idx - (startDay + data.month_days) + 1;
    extraClass = "text-gray-400 bg-gray-50";
  }

  const foodList = orderData?.items || [];
  const limitedList = foodList.slice(0, 3);
  const showEllipsis = foodList.length > 3;

  let shamsiDate = "";
  if (cellDate) {
    const [gy, gm, gd] = cellDate.split("-").map(Number);
    const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);
    shamsiDate = `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
  }

  const renderFoodItem = (item, idx) => {
    const mealInfo = meal?.[String(item.meal_id)];
    return (
      <div
        key={idx}
        className="truncate"
        style={{
          backgroundColor: hexToRgba(mealInfo?.color || "#000", 0.22),
          borderRight: `2px solid ${mealInfo?.color || "transparent"}`,
          padding: "2px 4px",
          color: "#000",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.food_name} ({item.count + item.takeaway_count})
      </div>
    );
  };

  const renderEmpty = () => (
    <div
      className={`text-center h-full flex flex-col justify-center items-center space-y-1 rounded-md transition-all duration-200 ${
        isPast || !isCurrentMonth ? "" : "bg-transparent"
      }`}
    >
      <FontAwesomeIcon
        icon={faUtensils}
        className={`text-xs ${
          !isCurrentMonth || isPast
            ? "text-gray-400 opacity-50"
            : "text-green-600 opacity-50"
        }`}
      />
      <div
        className={`${
          !isCurrentMonth ? "text-gray-400" : isPast ? "text-gray-400 opacity-50" : "text-green-600 opacity-50"
        }`}
      >
        سفارش ثبت نشده
      </div>
    </div>
  );

  return (
    <div
      className={`shadow-md rounded-xl py-2 px-1 text-xs select-none ${
        isCurrentMonth ? "cursor-pointer" : "cursor-default"
      } h-28 sm:h-24 md:h-28 ${extraClass}`}
      data-en-date={cellDate || undefined}
      data-fa-date={shamsiDate || undefined}
      onClick={() => isCurrentMonth && onClick(dayNumber, cellDate)}
    >
      <div className="flex flex-col h-full w-full justify-between">
        {isFirstRow && (
          <div className="h-[12%] flex items-center justify-center text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-gray-500">
            {weekDayName}
          </div>
        )}

        <div className="flex-1 text-[8px] sm:text-[9px] md:text-[10px] text-right overflow-hidden flex flex-col justify-start space-y-0.5">
          {foodList.length > 0 ? (
            <>
              {limitedList.map(renderFoodItem)}
              {showEllipsis && <div className="text-gray-400">...</div>}
            </>
          ) : (
            renderEmpty()
          )}
        </div>

        <div className="h-[16%] flex text-[8px] sm:text-[9px] md:text-[10px] px-1">
          {orderData?.survey_participation_complete && (
            <span className="flex-1 text-right text-irancell font-medium text-[7px] sm:text-[8px] md:text-[9px] tooltip">
              <FontAwesomeIcon icon={faCheck} className="cursor-pointer" />
              <span className="tooltip-text">
                شما در نظر‌سنجی روز شرکت کرده‌اید
              </span>
            </span>
          )}

          <span
            className={`flex-1 text-left ${
              isHoliday
                ? "text-red-600 font-semibold"
                : isPast
                ? "text-gray-500"
                : isToday
                ? "text-orange-500 font-semibold"
                : "text-green-600 font-semibold"
            }`}
          >
            {persion(dayNumber)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DayCell;
