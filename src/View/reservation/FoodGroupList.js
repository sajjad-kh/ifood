import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCalendar,
  faStar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { persion } from "../persian";
import BulkModal from "../bulk/bulkModal";

const FoodGroupList = ({ foodGroups, toggleFoodActive, changeCount, selectedMeal }) => {
  const { t } = useTranslation();

  // state برای مدال
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // state برای مدیریت باز بودن فقط یک collapse
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="space-y-2">
        {foodGroups?.map((group, gi) => {
          const reservedCount = group.mergedFoods?.reduce(
            (acc, f) => acc + (f.count || 0) + (f.takeaway_count || 0),
            0
          );

          return (
            <Collapsible
              key={gi}
              open={openIndex === gi} // 👈 فقط collapse جاری باز میشه
              handleTriggerClick={() =>
                setOpenIndex(openIndex === gi ? null : gi) // 👈 اگه روی همون کلیک کنی بسته میشه
              }
              trigger={
                <div
                  data-limit={group.limit}
                  className="flex justify-between items-center bg-white border rounded px-2 py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    {reservedCount > 0 && (
                      <span className="w-4 h-4 bg-orange-200 text-white rounded-full flex items-center justify-center text-[10px]">
                        {persion(reservedCount)}
                      </span>
                    )}
                    <span className="py-1">{group.title}</span>
                  </div>
                  <div className="flex">
                    {group.warning && (
                      <div className="mx-3 flex justify-end bg-red-200 text-red-600 text-[10px] px-2 py-1 rounded text-center">
                        {t("warnings.orderLimitExceeded")}
                      </div>
                    )}
                    <FontAwesomeIcon icon={faChevronDown} className="pt-1" />
                  </div>
                </div>
              }
              triggerWhenOpen={
                <div
                  data-limit={group.limit}
                  className="flex justify-between items-center bg-white border border-b-0 rounded-t px-2 py-1 cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    {reservedCount > 0 && (
                      <span className="w-5 h-5 bg-orange-400 text-white rounded-full flex items-center justify-center text-[10px]">
                        {persion(reservedCount)}
                      </span>
                    )}
                    <span className="py-1">{group.title}</span>
                  </div>
                  <div className="flex">
                    {group.warning && (
                      <div className="mx-3 flex justify-end bg-red-200 text-red-600 text-[10px] px-2 py-1 rounded text-center">
                        {t("warnings.orderLimitExceeded")}
                      </div>
                    )}
                    <FontAwesomeIcon icon={faChevronUp} className="pt-1" />
                  </div>
                </div>
              }
              transitionTime={450}
            >
              {/* محتوای داخل collapse */}
              <div className="bg-white border border-t-0 rounded-b p-2">
                {group.mergedFoods?.map((food, fi) => (
                  <div
                    key={`${food.active}-${fi}`}
                    className={`rounded px-1 flex flex-col md:flex-row items-start md:items-center w-full mb-2 ${
                      food.active ? "bg-gray-200" : "bg-gray-100"
                    }`}
                  >
                    {/* نام غذا + آیکون‌ها */}
                    <div className="flex items-center py-1 gap-2 font-semibold w-full md:w-5/12 text-sm md:text-xs text-right px-1 mb-2 md:mb-0">
                      <div className="flex items-center mb-2 md:mb-0 ">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="cursor-pointer text-orange-500 text-lg"
                          onClick={() => {
                            setSelectedFood(food.id);
                            setIsModalOpen(true);
                          }}
                        />
                        <label className="relative w-4 h-4 inline-block">
                          <input
                            type="checkbox"
                            checked={food.active}
                            onClick={() => toggleFoodActive(gi, fi)}
                            className={`cursor-pointer w-4 h-4 border-2 rounded appearance-none ${
                              food.active
                                ? "bg-orange-400 border-orange-400"
                                : "border-orange-400 bg-gray-100"
                            }`}
                            {...(food.order_id ? { "data-order-id": food.order_id } : {})}
                          />
                          {food.active && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs pointer-events-none">
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-400 overflow-hidden bg-orange-100">
                        {food.picture?.thumb || food.reserved_food?.picture?.thumb ? (
                          <img
                            src={food.picture?.thumb || food.reserved_food?.picture?.thumb}
                            alt={food.name}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <span>{food.name}</span>
                    </div>

                    {/* شمارنده‌ها */}
                    <div className="flex flex-col px-2 rounded justify-between w-full md:w-3/12 text-sm md:text-xs mb-2 md:mb-0">
                      {/* رستوران */}
                      <div
                        className={`flex items-center m-1 p-1 gap-1 rounded w-full ${
                          food.count ? "bg-orange-100" : "bg-white"
                        }`}
                      >
                        <span className="flex-1">{t("labels.restaurant")}</span>
                        <button
                          disabled={!(food.active || food.order_id)}
                          className="text-orange-400 rounded-xl border border-orange-400 w-5 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => changeCount(gi, fi, "+", "count")}
                        >
                          <span className="text-sm">+</span>
                        </button>
                        <span>{persion(food.count || 0)}</span>
                        <button
                          disabled={!(food.active || food.order_id)}
                          className="text-orange-400 rounded-xl border border-orange-400 w-5 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => changeCount(gi, fi, "-", "count")}
                        >
                          <span className="text-sm">-</span>
                        </button>
                      </div>

                      {/* بیرون بر */}
                      <div
                        className={`flex items-center m-1 p-1 gap-1 rounded w-full ${
                          food.takeaway_count ? "bg-orange-100" : "bg-white"
                        }`}
                      >
                        <span className="flex-1">{t("labels.takeaway")}</span>
                        <button
                          disabled={!(food.active || food.order_id)}
                          className="text-orange-400 rounded-xl border border-orange-400 w-5 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => changeCount(gi, fi, "+", "takeaway_count")}
                        >
                          <span className="text-sm">+</span>
                        </button>
                        <span>{persion(food.takeaway_count || 0)}</span>
                        <button
                          disabled={!(food.active || food.order_id)}
                          className="text-orange-400 rounded-xl border border-orange-400 w-5 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => changeCount(gi, fi, "-", "takeaway_count")}
                        >
                          <span className="text-sm">-</span>
                        </button>
                      </div>
                    </div>

                    {/* امتیاز و قیمت */}
                    <div className="flex flex-row justify-between items-center w-full md:w-4/12 text-sm md:text-xs text-orange-400">
                      <div
                        className="flex flex-row-reverse"
                        title={`نظر ${
                          food.participation_count ||
                          food.reserved_food?.participation_count ||
                          0
                        }`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={i < (food.rate || 0) ? "text-orange-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <div className="flex">
                        {persion(food.price || 0)}
                        <span className="text-[10px] mr-1">{t("currency.toman")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Collapsible>
          );
        })}
      </div>

      {/* مدال */}
      <BulkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        food={selectedFood}
        selectedMeal={selectedMeal}
      />
    </>
  );
};

export default FoodGroupList;
