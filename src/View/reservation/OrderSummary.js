import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useData } from "../context/DataContext";

const OrderSummary = ({
  totalOrders,
  totalAmount,
  totalCalories,
  requiredCalories,
  qr
}) => {
  const [showQR, setShowQR] = useState(false);
  const { state } = useData();
  return (
    <>
      {/* بخش اصلی */}
      <div className="flex py-2">
        <div className="flex bg-white border rounded px-2 py-2 cursor-pointer w-full ml-1">
          {/* ستون راست */}
          <div className="flex flex-col w-full lg:w-1/2 pl-2">
            <div className="flex justify-between py-1 my-1">
              <span className="text-sx text-black w-8/12">تعداد کل سفارشات:</span>
              <span className="text-sx text-black w-4/12 text-left pl-2">
                {totalOrders}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sx text-black w-8/12">مجموع مبلغ سفارشات:</span>
              <span className="text-sx text-black w-4/12 text-left pl-2">
                {totalAmount}
              </span>
            </div>
          </div>

          {/* ستون چپ */}
          <div className="flex flex-col w-full lg:w-1/2 pl-2">
            <div className="flex justify-between py-1 my-1">
              <span className="text-sx text-black w-8/12">
                مجموع کالری سفارشات:
              </span>
              <span className="text-sx text-black w-4/12 text-left pl-2">
                {totalCalories}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sx text-black w-8/12 sm:w-8/12">
                مجموع کالری روزانه شما:
              </span>
              <span className="text-sx text-black w-4/12 text-left pl-2 sm:w-4/12">
                {requiredCalories}
              </span>
            </div>
          </div>
        </div>

        {/* QR کوچک */}
        <div
          className="flex bg-white border rounded px-2 py-2 cursor-pointer items-center w-[80px]"
          onClick={() => setShowQR(true)}
        >
          <QRCodeCanvas value={qr} size={60} className="h-full" />
        </div>
      </div>

      {/* مودال */}
      {showQR && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-90 z-50"
          onClick={() => setShowQR(false)} // کلیک روی بک‌گراند → بستن مودال
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بستن مودال هنگام کلیک روی داخل
          >
            <QRCodeCanvas value={qr} size={300} />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
