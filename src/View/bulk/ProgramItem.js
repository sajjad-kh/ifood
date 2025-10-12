import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { persion } from "../persian";

const ProgramItem = ({ t, program, selectedDates, counts, selectedTimeFrame, handleCheck, handleCountChange, handleTimeChange }) => (
  <div className="rounded px-2 py-1 flex flex-col sm:flex-row items-start sm:items-center w-full bg-white gap-2">
    {/* Checkbox */}
    <div className="w-full sm:w-4/12 flex items-center gap-1">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={selectedDates[program.date] || false}
          onChange={() => handleCheck(program.date)}
          className={`w-4 h-4 border-2 rounded cursor-pointer appearance-none ${
            selectedDates[program.date] ? "bg-orange-400 border-orange-400" : "border-orange-400 bg-white"
          }`}
        />
        {selectedDates[program.date] && (
          <FontAwesomeIcon icon={faCheck} className="absolute text-white text-xs left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>
      <span className="flex-1 text-sm md:text-xs">{program.day_of_week} : {program.date}</span>
    </div>

    {/* Counts + Dropdown */}
    <div className="w-full sm:w-8/12 flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col sm:w-5/12 gap-1 px-2">
        {["restaurant","takeaway"].map(type => (
          <div key={type} className="flex flex-row bg-gray-100 p-1 items-center justify-between rounded">
            <span className="text-black text-[10px]">{type==="restaurant" ? t("at_restaurant") : t("takeaway")}</span>
            <div className="flex items-center gap-1 px-1">
              <button
                onClick={() => handleCountChange(program.date,type,-1)}
                className="border border-orange-400 rounded-full w-5 h-5 text-orange-400 disabled:opacity-50"
                disabled={!selectedDates[program.date] || counts[program.date]?.[type]<=0}
              >-</button>
              <span className={`px-1 ${counts[program.date]?.[type]>0 ? "text-orange-600" : "text-orange-400"}`}>
                {persion(counts[program.date]?.[type]||0)}
              </span>
              <button
                onClick={() => handleCountChange(program.date,type,1)}
                className="border border-orange-400 rounded-full w-5 h-5 text-orange-400"
                disabled={!selectedDates[program.date]}
              >+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row sm:w-7/12 sm:px-2 items-center justify-center">
        <select value={selectedTimeFrame[program.date]||""} onChange={e => handleTimeChange(program.date, e.target.value)} className="rounded py-1 px-2 bg-gray-100 w-full text-sm md:text-xs leading-tight">
          <option value="">{t("chooseTimeFrame")}</option>
          {program.delivery_place_times?.map(tw => (
            <option key={tw.window_number} value={tw.window_number}>{tw.start_time} - {tw.end_time}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default ProgramItem;
