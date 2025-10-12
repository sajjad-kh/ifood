import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReservesGroup from "./ReservesGroup";
import RightModal from "../RightModal";
import ReserveForm from "../ReserveForm";
import ViewForm from "../ViewForm";
import { useData } from "../context/DataContext";
import { gregorianToJalaliPlusOne, persianNumber, getDayStatus } from "../../function/view";

// اینجا فانکشن‌های API رو ایمپورت می‌کنیم
import { fetchDayData, fetchPastDayData } from "../../api/view";

// روزهای هفته به فارسی
const weekDayNames = ["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];





const WeekView = ({ data, todayStr }) => {
  const { setData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [deliveryPlaces, setDeliveryPlaces] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [dayInfo, setDayInfo] = useState(null);
  const [loadingDayData, setLoadingDayData] = useState(false);
  const [reserved, setReserved] = useState({ newOrders: [], editedOrders: [] });

  const { t, i18n } = useTranslation();
  const lang = i18n.language || "fa";

  if (!todayStr) return null;

  const today = new Date(todayStr);
  today.setHours(0, 0, 0, 0);

  const jsDay = today.getDay();
  const faDayOfWeek = (jsDay + 1) % 7;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() + (i - faDayOfWeek));
    day.setHours(0, 0, 0, 0);
    return day;
  });

  // کلیک روی روز
  const handleClickDay = async (dayObj) => {
    const nextDay = new Date(dayObj);
    nextDay.setDate(nextDay.getDate() + 1);

    const dayStr = nextDay.toISOString().split("T")[0];
    setSelectedDate(dayStr);
    setData((prev) => ({ ...prev, reserve: { date: dayStr } }));

    if (nextDay <= today) {
      const res = await fetchPastDayData(lang, dayStr);
      setDayInfo(res);
    } else {
      const dayData = await fetchDayData(lang, dayStr, setDeliveryPlaces, setLoadingDayData, setReservations, setData);
      setDayInfo(dayData);
    }

    setIsModalOpen(true);
  };

  const selected = selectedDate ? new Date(selectedDate) : null;

  return (
    <>
      <div className="flex flex-col gap-1 p-2">
        {weekDays.map((day, i) => {
          const dayStr = day.toISOString().split("T")[0];
          const { isToday, isPast } = getDayStatus(day, today);
          const borderColor = isPast ? "border-gray-400" : isToday ? "border-orange-400" : "border-green-400";

          const { jy, jm, jd } = gregorianToJalaliPlusOne(day.getFullYear(), day.getMonth() + 1, day.getDate());
          const faDateStr = `${jy}-${String(jm).padStart(2, "0")}-${String(jd).padStart(2, "0")}`;

          const reserves = data.orders?.find((o) => o.date === String(jd))?.reserves || [];

          return (
            <div
              key={i}
              data-en-date={dayStr}
              data-fa-date={faDateStr}
              className="flex flex-col md:flex-row gap-[4px] mb-1 cursor-pointer"
              onClick={() => handleClickDay(day)}
            >
              <div className={`w-full md:w-[6%] aspect-square flex flex-col items-center justify-center p-2 border ${borderColor} rounded space-y-2`}>
                <div className="text-xs">{weekDayNames[i]}</div>
                <div className="text-xs">{persianNumber(jd)}</div>
              </div>
              <ReservesGroup reserves={reserves} borderColor={borderColor} />
            </div>
          );
        })}
      </div>

      <RightModal
        footer={selected && selected >= today}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedDate
            ? new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)).toLocaleDateString("fa-IR")
            : ""
        }
        apiInfo={{ selectedDate, reservations, reserved }}
      >
        {loadingDayData ? (
          <div className="text-center p-4">در حال بارگذاری...</div>
        ) : selectedDate ? (
          selected <= today ? (
            <ViewForm date={selectedDate} data={dayInfo} />
          ) : (
            <ReserveForm
              date={selectedDate}
              dayData={dayInfo}
              dpObj={deliveryPlaces}
              reservations={reservations}
              onReservedChange={setReserved}
            />
          )
        ) : (
          <div>تاریخ انتخاب نشده</div>
        )}
      </RightModal>
    </>
  );
};

export default WeekView;
