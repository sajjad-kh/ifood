import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import RightModal from "../RightModal";
import ReserveForm from "../ReserveForm";
import ViewForm from "../ViewForm";
import Loader from "../Loader";
import DayCell from "./DayCell";
import MiniCalendar from "./MiniCalendar";
import FoodOrdersCard from "./FoodOrdersCard";
import { useData } from "../../View/context/DataContext";
import { fetchDayData, fetchPastDayData } from "../../api/view";
import { persion } from "../persian";

const MonthView = ({
  totalCells,
  startDay,
  data,
  days,
  todayStr,
  baseDate,
  localToday,
  order,
  meal,
  handleNextMonth,
  handlePrevMonth,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "fa";
  const { setData } = useData();

  // ==== States ====
  const [selectedDate, setSelectedDate] = useState(null); // DayCell
  const [dayInfo, setDayInfo] = useState(null); // DayCell
  const [loadingDayData, setLoadingDayData] = useState(false); // DayCell

  const [miniSelectedDate, setMiniSelectedDate] = useState(null); // MiniCalendar
  const [miniDayInfo, setMiniDayInfo] = useState(null); // MiniCalendar
  const [loadingMiniData, setLoadingMiniData] = useState(true); // MiniCalendar

  const [deliveryPlaceObj, setDeliveryPlaceObj] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reserved, setReserved] = useState({ newOrders: [], editedOrders: [] });

  // ==== Prepare orders by day ====
  const orderByDay = Array.isArray(order)
    ? order.reduce((acc, curr) => {
        acc[curr.day] = {
          items: curr.reserves || [],
          survey_participation_complete: curr.survey_participation_complete ?? true,
        };
        return acc;
      }, {})
    : {};

  const todayCon = new Date(new Date().setHours(0, 0, 0, 0));

  // ==== Load initial past day for MiniCalendar card ====
  useEffect(() => {
    const fetchInitialPastDay = async () => {
      setLoadingMiniData(true);
      try {
        const today = new Date();
        const isoDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(today.getDate()).padStart(2, "0")}`;

        const res = await fetchPastDayData(lang, isoDate);
        setMiniDayInfo(res);
        setMiniSelectedDate(isoDate);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMiniData(false);
      }
    };
    fetchInitialPastDay();
  }, [baseDate, lang]);

  // ==== Handle DayCell click (RightModal) ====
  const handleDayCellClick = async (dayNumber, date) => {
    if (!date) return;
    setSelectedDate(date);
    setData(prev => ({ ...prev, reserve: { date } }));
    setLoadingDayData(true);

    try {
      let dayData;
      if (new Date(date) <= localToday) {
        dayData = await fetchPastDayData(lang, date);
      } else {
        dayData = await fetchDayData(
          lang,
          date,
          setDeliveryPlaceObj,
          setLoadingDayData,
          setReservations,
          setData
        );
      }
      setDayInfo(dayData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDayData(false);
    }
  };

  // ==== Handle MiniCalendar click (only card, no RightModal) ====
  const handleMiniCalendarClick = async (dayNumber, date) => {
    if (!date) return;
    setMiniSelectedDate(date);
    setLoadingMiniData(true);
    try {
      const res = await fetchPastDayData(lang, date);
      setMiniDayInfo(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMiniData(false);
    }
  };

  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  return (
    <>
      {/* RightModal Loader */}
      <Loader loading={loadingDayData} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Main Calendar (DayCells) */}
        <div className="md:col-span-9 order-1 md:order-none">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 text-center gap-1">
            {Array.from({ length: totalCells }).map((_, idx) => (
              <DayCell
                key={idx}
                idx={idx}
                startDay={startDay}
                data={data}
                days={days}
                todayStr={todayStr}
                baseDate={baseDate}
                localToday={localToday}
                orderByDay={orderByDay}
                meal={meal}
                onClick={handleDayCellClick}
              />
            ))}
          </div>
        </div>

        {/* Right: MiniCalendar + Card */}
        <div className="md:col-span-3 order-2 md:order-none">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="p-2">
              {data.month_name} {persion(data.year)}
            </div>

            <div className="w-full border-t border-gray-400 p-2 mb-2">
              <div className="grid grid-cols-7 text-center text-gray-300 text-xs font-medium gap-5">
                {weekDays.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: totalCells }).map((_, idx) => (
                <MiniCalendar
                  key={idx}
                  idx={idx}
                  startDay={startDay}
                  data={data}
                  days={days}
                  todayStr={todayStr}
                  baseDate={baseDate}
                  localToday={localToday}
                  orderByDay={orderByDay}
                  meal={meal}
                  onClick={handleMiniCalendarClick}
                  selectedDate={miniSelectedDate}
                />
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 mt-2">
            {loadingMiniData ? (
              <div className="text-center text-gray-400">{t("loading") || "در حال بارگذاری..."}</div>
            ) : miniDayInfo ? (
              <FoodOrdersCard data={miniDayInfo} />
            ) : (
              <p className="text-gray-400">هیچ روز گذشته‌ای وجود ندارد.</p>
            )}
          </div>
        </div>
      </div>

      {/* RightModal for DayCell only */}
      <RightModal
        footer={selectedDate ? new Date(selectedDate) >= localToday : false}
        isOpen={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        title={selectedDate ? new Date(selectedDate).toLocaleDateString("fa-IR") : ""}
        apiInfo={{ selectedDate, reservations, reserved }}
      >
        {loadingDayData ? (
          <div className="text-center p-4">{t("loading") || "در حال بارگذاری..."}</div>
        ) : selectedDate ? (
          new Date(selectedDate) < todayCon ? (
            <ViewForm
              date={selectedDate}
              data={dayInfo}
              api2Data={dayInfo?.api2Data}
              api3Data={dayInfo?.api3Data}
            />
          ) : (
            <ReserveForm
              date={selectedDate}
              dayData={dayInfo}
              dpObj={deliveryPlaceObj}
              reservations={reservations}
              onReservedChange={setReserved}
            />
          )
        ) : (
          <div>لطفا یک روز را انتخاب کنید</div>
        )}
      </RightModal>
    </>
  );
};

export default MonthView;
