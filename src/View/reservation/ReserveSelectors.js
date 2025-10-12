import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const ReserveSelectors = ({
  restaurants,
  vendors,
  meals,
  selectedRest,
  selectedVendor,
  selectedMeal,
  selectedTime,
  selectedDate,
  onRestChange,
  onVendorChange,
  onMealChange,
  onTimeChange,
  onDateChange,
  onSetDefault,
  loadingDefault,
  reserveOBJ,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap mt-2">
      {/* تاریخ */}
      <div className="w-1/3 p-1">
        <p className="text-xs">{t("date")}</p>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          className="h-8 my-1 leading-[2rem] py-0 px-2 border rounded w-full"
          wrapperClassName="w-full"
          calendarStartDay={6}
        />
      </div>

      {/* رستوران */}
      <div className="w-1/3 p-1">
        <label className="text-xs">{t("selectors.restaurant")}</label>
        <select
          value={selectedRest}
          onChange={(e) => onRestChange(e.target.value)}
          className="my-1 h-8 leading-[2rem] py-0 px-2 border rounded w-full"
        >
          <option value="">{t("selectors.chooseRest")}</option>
          {restaurants?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* پیمانکار */}
      <div className="w-1/3 p-1">
        <label className="text-xs">{t("selectors.vendor")}</label>
        <select
          value={selectedVendor}
          onChange={(e) => onVendorChange(e.target.value)}
          className="my-1 h-8 leading-[2rem] py-0 px-2 border rounded w-full"
        >
          <option value="">{t("selectors.chooseVendor")}</option>
          {vendors?.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {/* نوع غذا */}
      <div className="w-1/3 p-1">
        <label className="text-xs">{t("selectors.mealType")}</label>
        <select
          value={selectedMeal}
          onChange={(e) => onMealChange(e.target.value)}
          className="my-1 h-8 leading-[2rem] py-0 px-2 border rounded w-full"
        >
          <option value="">{t("selectors.chooseMeal")}</option>
          {meals?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* زمان */}
      <div className="w-1/3 p-1">
        <label className="text-xs">{t("selectors.time")}</label>
        <select
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
          className="my-1 h-8 leading-[2rem] py-0 px-2 border rounded w-full"
        >
          <option value="">{t("selectors.chooseTimeFrame")}</option>
          {reserveOBJ.delivery_place_times?.map((r) => (
            <option key={r.window_number} value={r.window_number}>
              {`${t("from")} ${r.start_time} ${t("to")} ${r.end_time} (${r.remain_capacity})`}
            </option>
          ))}
        </select>
      </div>

      {/* انتخاب پیش فرض */}
      <div className="w-1/3 p-1">
        <label className="text-[10px]">{t("selectors.setDefault")}</label>
        <button
          onClick={onSetDefault}
          disabled={loadingDefault}
          className="my-1 h-8 leading-[2rem] py-0 px-2 bg-irancell border rounded w-full text-xs flex items-center justify-center gap-2"
        >
          {loadingDefault && <FontAwesomeIcon icon={faSpinner} spin />}
          {t("selectors.setDefault")}
        </button>
      </div>
    </div>
  );
};

export default ReserveSelectors;
