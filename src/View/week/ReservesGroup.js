// ReservesGroup.jsx
import React from "react";

const ReservesGroup = ({ reserves, borderColor }) => {
  if (!reserves || reserves.length === 0) {
    return (
      <div
        className={`w-full md:w-[94%] p-2 bg-white border rounded flex flex-col justify-center items-center flex-1 ${borderColor} `}
      >
        <div className="text-xs text-gray-500">شما غذا سفارش ندادین :(</div>
      </div>
    );
  }

  // گروه‌بندی بر اساس meal_id
  const grouped = reserves.reduce((acc, order) => {
    if (!acc[order.meal_id]) acc[order.meal_id] = [];
    acc[order.meal_id].push(order);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-1 w-full md:w-[94%] ">
      {Object.entries(grouped).map(([mealId, orders]) => (
        <div
          key={mealId}
          className={`p-2 border ${borderColor} rounded bg-white h-full`}
        >
          <div className="flex items-stretch">
            {/* ستون کوچک کنار رزروها */}
            <div className={`w-[1%] border-r-2 ${borderColor}`}></div>

            {/* ستون اصلی رزروها */}
            <div className="flex-1 flex flex-col">
              {orders.map((order, idx) => (
                <div key={idx} className="mb-2">
                  <div className="text-xs">
                    {order.food_name} ({order.count + order.takeaway_count})
                  </div>
                </div>
              ))}

              {/* نمایش meal_id زیر سفارش‌ها */}
              <div className="hidden text-[10px] text-gray-400 mt-2">
                meal id: {mealId}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservesGroup;
