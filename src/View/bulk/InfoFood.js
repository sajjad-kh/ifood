import React from "react";
import { persion } from "../persian";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const InfoFood = ({ t, data, activateAllRestaurant, activateAllTakeaway }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-2 mx-4">
      <div className="flex gap-2">
        <div className="flex flex-row gap-2 w-full">
          <button onClick={activateAllRestaurant} className="bg-irancell text-white px-2 py-1 rounded hover:bg-orange-500 w-1/2 sm:w-auto text-sm md:text-xs">{t("at_restaurant")}</button>
          <button onClick={activateAllTakeaway} className="bg-irancell text-white px-2 py-1 rounded hover:bg-orange-500 w-1/2 sm:w-auto text-sm md:text-xs">{t("takeaway")}</button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white p-3 rounded">
        <div className="w-20 h-20 flex-shrink-0 rounded-[50%] p-1 border border-orange-400 overflow-hidden bg-orange-100">
          {data.food_picture?.thumb ? (
            <img src={data.food_picture.thumb} alt={data.food_name_fa} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-orange-200" />
          )}
        </div>
        <div className="w-full">
          <p className="text-base font-semibold text-black">{data.food_name_fa}</p>
          <p className="text-xs text-gray-600 mt-1">{data.food_material_fa}</p>
          <div className="flex w-full">
            <div className="flex w-full gap-4 mt-2 text-center">
              <div className="w-1/3">
                <p className="text-xs text-black">قیمت</p>
                <p className="text-orange-400 mt-1">{persion(data.food_price || 0)} تومان</p>
              </div>
              <div className="w-1/3 border-x-2">
                <p className="text-xs text-black">کالری</p>
                <p className="text-orange-400 mt-1">{data.food_calory || 0}</p>
              </div>
              <div className="w-1/3 text-center">
                <p className="text-xs text-black">امتیاز</p>
                <p className="flex mt-1 gap-1 text-orange-400 justify-center">{data.food_rate || 0} <FontAwesomeIcon icon={faStar} /></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoFood;
