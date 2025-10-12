import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { hexToRgba, gregorianToJalali } from "../../function/view";
import { persion } from "../persian";

const MiniCalendar = ({ idx, startDay, data, days, todayStr, baseDate, localToday, orderByDay, meal, onClick ,selectedDate}) => {

  const isFirstRow = idx < 7;
  const weekDayName = days[idx % 7];
  let dayNumber, isHoliday = false, isToday = false, isPast = false, cellDate = null;
  let extraClass = "text-transparent", orderData = null, isCurrentMonth = false;

  if (idx < startDay) {
    dayNumber = (data.pre_month_days || 0) - startDay + idx + 1;
  } else if (idx < startDay + data.month_days) {
    dayNumber = idx - startDay + 1;
    isCurrentMonth = true;

    const dateCopy = new Date(baseDate.getTime());
    dateCopy.setDate(baseDate.getDate() + dayNumber);
    cellDate = dateCopy.toISOString().split("T")[0];

    isHoliday = data.off_days.includes(cellDate);


    isToday = cellDate === todayStr;
    isPast = new Date(cellDate) < localToday;
    orderData = orderByDay?.[dayNumber] || null;

    extraClass = isToday ? "shadow-md bg-orange-200" : "";
  } else {
    dayNumber = idx - (startDay + data.month_days) + 1;
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

  return (
    <div
      className={`items-center justify-center rounded-full w-8 h-8 text-sm select-none text-center ${isCurrentMonth ? "cursor-pointer" : "cursor-default"} ${extraClass}`}
      data-en-date={cellDate || undefined}
      data-fa-date={shamsiDate || undefined}
      onClick={() => isCurrentMonth && onClick(dayNumber, cellDate)}
    >
      {/* {isFirstRow && <div className="h-[12%] flex items-center justify-center text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-gray-500">{weekDayName}</div>} */}

      <div className="flex flex-col h-full w-full justify-between">
        <div className="h-full flex items-center justify-center text-sm sm:text-[9px] md:text-[13px] px-1">
          <span className={`font-semibold`}>{persion(dayNumber)}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;