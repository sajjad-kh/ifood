import React, { useState, useMemo, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const FoodOrdersCard = ({ data }) => {
  const groupedOrders = useMemo(() => {
    if (!data?.orders?.length) return [];
    const groups = {};
    data.orders.forEach((order) => {
      const key = order.delivery_place_id;
      if (!groups[key]) groups[key] = [];
      groups[key].push(order);
    });
    return Object.values(groups);
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const qrRef = useRef(null); // ref برای QR code

  if (!data || !data.orders || data.orders.length === 0) {
    return <p className="text-gray-400 text-sm">هیچ سفارشی وجود ندارد.</p>;
  }

  const currentGroup = groupedOrders[currentIndex];
  const isMultiPlace = groupedOrders.length > 1;
  const firstOrder = currentGroup[0];

  const handlePrev = () => {
    if (isMultiPlace)
      setCurrentIndex((prev) =>
        prev === 0 ? groupedOrders.length - 1 : prev - 1
      );
  };

  const handleNext = () => {
    if (isMultiPlace)
      setCurrentIndex((prev) =>
        prev === groupedOrders.length - 1 ? 0 : prev + 1
      );
  };

  // دانلود QR
    const handleDownloadQR = () => {
		if (!qrRef.current) return;
		const canvas = qrRef.current.querySelector("canvas");
		if (!canvas) return;

		const url = canvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = url;

		const dateStr = firstOrder?.date || new Date().toISOString().split("T")[0];
		const startTime = (firstOrder?.start_window_time || "00:00").replace(/:/g, '');
		const endTime = (firstOrder?.end_window_time || "23:59").replace(/:/g, '');
		link.download = `${dateStr}|${startTime}${endTime}.png`;

		link.click();
    };


  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">غذای روز</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={!isMultiPlace}
            className={`p-1 rounded-full transition ${
              isMultiPlace
                ? "hover:bg-gray-100 cursor-pointer"
                : "opacity-50 cursor-default"
            }`}
          >
            {"<"}
          </button>
          <button
            onClick={handleNext}
            disabled={!isMultiPlace}
            className={`p-1 rounded-full transition ${
              isMultiPlace
                ? "hover:bg-gray-100 cursor-pointer"
                : "opacity-50 cursor-default"
            }`}
          >
            {">"}
          </button>
        </div>
      </div>

      <hr className="my-3 border-t border-gray-200" />

      {/* Info section */}
      <div className="space-y-2 text-xs text-gray-700">
        <div className="flex justify-between">
          <span>رستوران</span>
          <span className="">{firstOrder.restaurant}</span>
        </div>
        <div className="flex justify-between">
          <span>پیمانکار</span>
          <span className="">{firstOrder.vendor}</span>
        </div>
        <div className="flex justify-between">
          <span>وعده غذایی</span>
          <span className="">{firstOrder.meal}</span>
        </div>
        <div className="flex justify-between">
          <span>بازه زمانی</span>
          <span className="">
            {(firstOrder.start_window_time)} تا {firstOrder.end_window_time}
          </span>
        </div>
      </div>

      {/* Orders list: یک QR و لیست همه غذاها */}
      <div className="mt-2 space-y-2">
        <div className="flex items-start gap-3 rounded-xl p-1 items-center justify-center">
          {/* Right side (QR code) */}
          <div
            ref={qrRef}
            className="w-4/12 flex justify-center p-1 cursor-pointer"
            onClick={handleDownloadQR}
          >
            <QRCodeCanvas
              value={firstOrder.qr_code} // فقط QR اولین سفارش (برای کل گروه)
              size={90}
              includeMargin={false}
            />
          </div>

          {/* Left side (food info: همه سفارش‌ها) */}
          <div className="w-8/12 space-y-1">
            {currentGroup.map((order) => (
              <div key={order.order_id}>
                <p className="font-semibold text-gray-800 text-xs">{order.food_name}</p>
                <p className="text-sm text-gray-500 text-xs">
                  {order.food_profile.material_fa}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodOrdersCard;
