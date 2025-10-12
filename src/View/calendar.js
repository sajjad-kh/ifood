// Calendar.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import MonthView from "./month/MonthView";
import WeekView from "./week/WeekView";
import { persion, persionSlice } from "./persian";
import { fetchCalendar } from "../api/calendarApi";
import Notifications from "./notification/Notifications";
import Loader from "./Loader";

const weekDayToIndex = { Sat: 0, Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6 };

const Calendar = ({ userId }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "fa";
  const navigate = useNavigate();
  const [view, setView] = useState("month");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNoGroupModal, setShowNoGroupModal] = useState(false);
  const [startDay, setStartDay] = useState(0);
  const [totalFilled, setTotalFilled] = useState(0);
  const [baseDate, setBaseDate] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

  const totalCells = Math.ceil(totalFilled / 7) * 7;
  const todayStr = new Date().toISOString().split("T")[0];
  const days = t("days", { returnObjects: true });

  const loadCalendar = async (date) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCalendar(lang, date);
      setData(res);
      setShowNoGroupModal(!res.has_group);
      setStartDay(weekDayToIndex[res.month_first_day] || 0);
      setTotalFilled((weekDayToIndex[res.month_first_day] || 0) + res.month_days);
      setBaseDate(new Date(res.month_first_day_date));
      setImageSrc(res.imageSrc || "");
      localStorage.setItem("start-month", res.month_first_day_date.split("T")[0] || "");
      localStorage.setItem("end-month", res.end_reservation_date || "");
    } catch (err) {
      console.error(err);
      setError(t("fetchError") || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    loadCalendar(todayStr);
  }, [userId, lang]);

  const handlePrevMonth = () => {
    if (!baseDate) return;
    const prevMonth = new Date(baseDate);
    prevMonth.setMonth(prevMonth.getMonth());
    loadCalendar(prevMonth.toISOString().split("T")[0]);
  };

  const handleNextMonth = () => {
    if (!baseDate) return;
    const elements = document.querySelectorAll("[data-en-date]");
    let targetDate = new Date(baseDate);
    if (elements.length) {
      const last = elements[elements.length - 1].getAttribute("data-en-date");
      if (last) targetDate = new Date(last);
    }
    targetDate.setMonth(targetDate.getMonth() + 1);
    loadCalendar(targetDate.toISOString());
  };

  if (!data && !loading && !error) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white rounded-lg shadow-md">
      <Header />
      <div className="flex-1 p-4 overflow-auto">
        <Loader loading={loading} />
        {error && <div className="text-center p-4 text-red-600">{error}</div>}

        {showNoGroupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
              <p className="text-gray-800 text-sm mb-4">{t("notGroup")}</p>
              <button
                onClick={() => setShowNoGroupModal(false)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                {t("close")}
              </button>
            </div>
          </div>
        )}

        {data && (
          <>
            <div className="text-center mb-4 font-semibold text-gray-800">{t("foodRerserve")}</div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div className="flex flex-row w-full items-center gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
                <div
                  onClick={() => !loading && navigate("/profile")}
                  className={`rounded-md p-1 w-48 max-sm:w-full bg-gray-100 flex items-center gap-2 cursor-pointer ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div className="flex-shrink-0 rounded-full overflow-hidden bg-white w-8 h-8 border border-1 border-orange-400">
                    {imageSrc ? <img src={imageSrc} alt="calendar info" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100" />}
                  </div>
                  {!imageSrc && <p className="text-xs text-gray-700 truncate w-36">{t("calendarInfoText")}</p>}
                </div>

                <div className="bg-gray-100 p-1 rounded-md flex gap-1 text-xs max-sm:w-full">
                  <button className={`flex-1 px-3 py-2 rounded-md ${view === "month" ? "bg-orange-400 text-white" : "text-gray-300"}`} onClick={() => setView("month")} disabled={loading}>{t("month")}</button>
                  <button className={`flex-1 px-3 py-2 rounded-md ${view === "week" ? "bg-orange-400 text-white" : "text-gray-300"}`} onClick={() => setView("week")} disabled={loading}>{t("week")}</button>
                </div>

                <div className="flex flex-row items-center justify-center gap-2">
                  <button onClick={handlePrevMonth} disabled={loading || !data.allowed_to_see_pre_month} className={`px-3 py-1 rounded transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>{"<"}</button>
                  <button onClick={handleNextMonth} disabled={loading || !data.allowed_to_see_next_month} className={`px-3 py-1 rounded transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>{">"}</button>
                </div>

                <div className="flex-row items-center justify-center text-gray-800 text-sm">{data.month_name} {persion(data.year)}</div>
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-end max-sm:w-full">
                <div onClick={() => !loading && navigate("/credit-detail")} className={`flex justify-center gap-1 bg-gray-100 text-black px-3 py-1 rounded-md text-sm cursor-pointer w-full ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                  <FontAwesomeIcon icon={faWallet} />
                  <span>{persionSlice(data.current_credit || 0)}</span>
                  <span className="text-sm">{t("toman")}</span>
                </div>
              </div>
            </div>

            {view === "month" ? (
              <MonthView totalCells={totalCells} startDay={startDay} data={data} days={days} todayStr={todayStr} baseDate={baseDate} localToday={new Date()} order={data.orders} meal={data.meals} handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth} />
            ) : (
              <WeekView baseDate={baseDate} days={days} data={data} todayStr={todayStr} />
            )}
          </>
        )}
      </div>

      <Notifications notifications={data?.notifications} lang={lang} />
    </div>
  );
};

export default Calendar;
