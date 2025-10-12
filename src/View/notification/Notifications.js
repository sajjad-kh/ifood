import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import RightModal from "../RightModal";
import ViewForm from "../ViewForm";
import { useNotifications } from "../../function/notifications/useNotifications";
import { downloadQR } from "../../api/notification/notifications";

const Notifications = ({ notifications: initialNotifications, lang }) => {
  const { i18n } = useTranslation();
  const language = lang || i18n.language || "fa";
  const navigate = useNavigate();

  const {
    current,
    show,
    index,
    dayData,
    loadingDay,
    selectedDate,
    setShow,
    setSelectedDate,
    handleHide,
    handleClickDate,
    showNotification,
  } = useNotifications(initialNotifications, language);

  const renderLinks = () => {
    if (!current) return null;

    // survey reminder
    if (current.title === "survey reminder" && current.to_date) {
      const dates = Array.isArray(current.to_date) ? current.to_date : [current.to_date];
      return dates.map((date, idx) => {
        const element = document.getElementById(`each_day_${date}`);
        const shamsiDate = element?.getAttribute("data-fa-date") || "";
        const miladiDate = element?.getAttribute("data-en-date") || shamsiDate;
        return (
          <span
            key={idx}
            className="px-3 py-1 text-xs bg-orange-100 rounded cursor-pointer hover:bg-orange-200 transition"
            onClick={() => handleClickDate(miladiDate)}
          >
            {shamsiDate}
          </span>
        );
      });
    }

    // qr reminder
    if (current.title === "qr reminder" && current.link) {
      const links = Array.isArray(current.link) ? current.link : [current.link];
      return links.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1 w-full sm:w-auto">
          <QRCodeCanvas id={`qr-${idx}`} value={item.code} size={128} className="hidden" />
          <button
            onClick={() => downloadQR(`qr-${idx}`, `qr_${idx + 1}.png`)}
            className="px-3 py-1 text-xs bg-orange-100 rounded hover:bg-orange-200 w-full text-center truncate transition"
          >
            {`${idx + 1}. ${item.resturant} - ${item.meal}`}
          </button>
        </div>
      ));
    }

    return null;
  };

  if (!current) return null;

  return (
    <>
      <div
        className={`fixed bottom-4 left-0 p-2 w-[calc(100%-1rem)] sm:w-1/2 sm:max-w-sm ${
          current.title === "---" ? "bg-orange-50" : "bg-white"
        } border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
          show ? "opacity-100 translate-x-3" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-center p-1 gap-1">
          <button
            className="w-1/5 sm:w-1/12 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => index > 0 && showNotification(index - 1)}
          >
            {"<"}
          </button>
          <div className="flex-1 text-center font-bold truncate" />
          <button
            className="w-1/5 sm:w-1/12 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => index + 1 < initialNotifications.length && showNotification(index + 1)}
          >
            {">"}
          </button>
        </div>

        {/* Description */}
        <div className="pt-1 pb-3 text-xs text-center">
          {language === "fa" ? current.fa_description : current.en_description}
          <div className="flex flex-wrap justify-center gap-2 mt-2">{renderLinks()}</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-1 p-1 text-xs">
          <button
            className="flex-1 h-7 bg-white border rounded"
            onClick={() => setShow(false)}
          >
            بستن
          </button>
          <button
            className="flex-1 h-7 bg-white border rounded"
            onClick={() => handleHide(current.id)}
          >
            عدم نمایش
          </button>
          {(current.title === "amount reminder" || current.title === "bmi reminder") && (
            <button
              className="flex-1 h-7 rounded bg-orange-500 text-white"
              onClick={() =>
                navigate(current.title === "amount reminder" ? "/credit-detail" : "/Profile")
              }
            >
              {current.title === "amount reminder" ? "میزان اعتبار" : "BMI شما"}
            </button>
          )}
        </div>
      </div>

      {/* RightModal */}
      <RightModal
        isOpen={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        title={selectedDate ? new Date(selectedDate).toLocaleDateString("fa-IR") : ""}
        footer={false}
        apiInfo={{ selectedDate }}
      >
        {loadingDay ? (
          <p className="p-4 text-center">در حال بارگذاری...</p>
        ) : dayData ? (
          <ViewForm
            date={selectedDate}
            data={dayData}
            api2Data={dayData?.api2Data}
            api3Data={dayData?.api3Data}
          />
        ) : (
          <p className="p-4 text-center">داده‌ای موجود نیست</p>
        )}
      </RightModal>
    </>
  );
};

export default Notifications;
