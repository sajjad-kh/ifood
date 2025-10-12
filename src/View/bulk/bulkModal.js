import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { fetchBulkMenu, bulkReserve } from "../../api/bulk/bulkApi";
import Header from "./header";
import InfoFood from "./InfoFood";
import ProgramItem from "./ProgramItem";
import * as helpers from "../../function/bulk/bulkHelpers";

const BulkModal = ({ isOpen, onClose, food, selectedMeal }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [counts, setCounts] = useState({});
  const [selectedTimeFrame, setSelectedTimeFrame] = useState({});
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'fa';

  useEffect(() => {
    if (!isOpen || !food || !selectedMeal) return;
    setLoading(true);
    fetchBulkMenu(food, selectedMeal)
      .then(res => {
        setData(res);
        const initialCounts = {};
        const initialDates = {};
        const initialTimeFrame = {};
        res.food_programs?.forEach(program => {
          initialCounts[program.date] = { restaurant: 0, takeaway: 0 };
          initialDates[program.date] = false;
          initialTimeFrame[program.date] = program.delivery_place_times?.[0]?.window_number || "";
        });
        setCounts(initialCounts);
        setSelectedDates(initialDates);
        setSelectedTimeFrame(initialTimeFrame);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isOpen, food, selectedMeal]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 w-full sm:w-full h-full sm:h-[95vh] bg-gray-100 shadow-lg z-50 flex flex-col transition-transform duration-500 ease-in-out rounded-none sm:rounded-l">
      <Header onClose={onClose} t={t} />
      <InfoFood
        t={t}
        data={data}
        activateAllRestaurant={() => helpers.activateAll(data, selectedDates, counts, setSelectedDates, setCounts, "restaurant")}
        activateAllTakeaway={() => helpers.activateAll(data, selectedDates, counts, setSelectedDates, setCounts, "takeaway")}
      />
      <div className="p-4 flex-1 overflow-auto space-y-2 scrollbar-hide">
        {loading ? <div>{t("loading")}</div> :
          data?.food_programs?.map(program => (
            <ProgramItem
              key={program.date}
              t={t}
              program={program}
              selectedDates={selectedDates}
              counts={counts}
              selectedTimeFrame={selectedTimeFrame}
              handleCheck={date => helpers.handleCheck(date, selectedDates, setSelectedDates, counts, setCounts)}
              handleCountChange={(date, type, delta) => helpers.handleCountChange(date, type, delta, counts, setCounts)}
              handleTimeChange={(date, value) => helpers.handleTimeChange(date, value, setSelectedTimeFrame)}
            />
          ))
        }
      </div>
      <div className="flex justify-end gap-4 p-4">
        <button className="flex-1 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={onClose}>{t("cancel")}</button>
        <button
          className="flex-1 bg-irancell text-white px-4 py-2 rounded hover:bg-orange-500"
          onClick={() => helpers.handleReserve(data, selectedDates, counts, selectedTimeFrame, food, selectedMeal, lang, bulkReserve, onClose)}
        >
          {t("reserve")}
        </button>
      </div>
    </div>
  );
};

export default BulkModal;
