import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { QRCodeCanvas } from "qrcode.react";
import client from '../api/client';

import CaleryForm from './caleryForm';

const ViewForm = ({ date, selectedDate, data }) => {
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [savedOrders, setSavedOrders] = useState({});

  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'fa';

  const [showCaleryForm, setShowCaleryForm] = useState(false);

  // گروه‌بندی سفارش‌ها بر اساس delivery_place_id
  const groupedOrders = data?.orders?.reduce((acc, order) => {
    if (!acc[order.delivery_place_id]) acc[order.delivery_place_id] = [];
    acc[order.delivery_place_id].push(order);
    return acc;
  }, {}) || {};

  // گرفتن بازه زمانی
  const getDeliveryTime = (placeId) =>
    Array.isArray(data?.delivery_place_times)
      ? data.delivery_place_times.find(t => t.window_number === placeId)
      : null;

  const handleStarClick = (orderId, star) => {
    setRatings(prev => ({ ...prev, [orderId]: star }));
  };

  const handleCommentChange = (orderId, value) => {
    setComments(prev => ({ ...prev, [orderId]: value }));
  };

  const handleSave = async (orderId) => {
    const order = data?.orders?.find(o => o.order_id === orderId);
    const survey = [
      {
        id: order?.food_profile?.id,
        order_id: orderId,
        rate: (ratings[orderId] || 0) * 2,
        comment: comments[orderId] || ""
      }
    ];

    try {
      const res = await client.post(`/${lang}/food_profiles/rate`, { survey });
      console.log("Survey saved:", res.data);

      setSavedOrders(prev => ({ ...prev, [orderId]: true }));
      setActiveSurvey(null);
      setRatings(prev => ({ ...prev, [orderId]: 0 }));
      setComments(prev => ({ ...prev, [orderId]: "" }));
    } catch (err) {
      console.error("Error saving survey:", err);
      alert("مشکلی در ذخیره‌سازی پیش آمد!");
    }
  };

  useEffect(() => {
    const initialRatings = {};
    const initialComments = {};

    data?.orders?.forEach(order => {
      if (order.order_status === "سرو شده") {
        initialRatings[order.order_id] = order.rate > 0 ? order.rate : 0;
        initialComments[order.order_id] = order.comment || "";
      }
    });

    setRatings(initialRatings);
    setComments(initialComments);
  }, [data]);

  return (
    <>
      {showCaleryForm && (<CaleryForm date={date} />)}

      {!showCaleryForm && (
        <div className="flex flex-col h-full max-h-[90vh] text-xs p-2 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="bg-white p-1 rounded shadow-md flex gap-2">
            <button className="px-2 p-1 rounded bg-irancell text-white flex-1" type="button">مشاهده غذا</button>
            <button className="px-4 py-2 rounded text-gray-400 flex-1" type="button" onClick={() => setShowCaleryForm(true)}>مشاهده کالری</button>
          </div>

          {groupedOrders && Object.entries(groupedOrders).map(([placeId, orders], idx) => {
            const deliveryTime = getDeliveryTime(Number(placeId));
            return (
              <div key={idx} className="bg-white rounded-md shadow-md p-3 space-y-3">
                {/* اطلاعات رستوران و QR */}
                <div className="flex gap-2">
                  <div className="w-9/12 bg-gray-100 rounded p-2 space-y-2">
                    <div className="flex justify-between"><span className='font-bold'>رستوران:</span><span>{orders[0].restaurant}</span></div>
                    <div className="flex justify-between"><span className='font-bold'>پیمانکار:</span><span>{orders[0].vendor}</span></div>
                    <div className="flex justify-between"><span className='font-bold'>وعده غذایی:</span><span>{orders[0].meal}</span></div>
                    <div className="flex justify-between"><span className='font-bold'>بازه زمانی:</span>
                      <span>
                        {deliveryTime ? `${deliveryTime.start_time} - ${deliveryTime.end_time}` : "نامشخص"}
                      </span>
                    </div>
                  </div>

                  <div className="w-3/12 bg-gray-100 rounded flex flex-col items-center justify-center p-2">
                    <QRCodeCanvas value={orders[0].qr_code} size={64} />
                    <span className="mt-2 text-[10px]">لطفاً اسکن کنید</span>
                  </div>
                </div>

                {/* سفارش‌ها */}
                {orders.map((order, i) => (
                  <div key={i} className="space-y-3 bg-gray-100 p-1 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-1/12 flex-shrink-0">
                        <img
                          src={order.food_profile?.picture?.thumb || order.picture || "/placeholder.png"}
                          alt={order.food_name}
                          className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1 text-[14px]">
                        <span className="font-bold pt-1">{order.food_name}</span>
                        <span className="text-gray-500 text-[11px] py-1">{order.food_profile?.material_fa}</span>
                      </div>

                      {order.order_status === "سرو شده" && !savedOrders[order.order_id] && (
                        <div
                          className="flex items-center text-gray-600 text-[11px] cursor-pointer"
                          onClick={() => setActiveSurvey(activeSurvey === order.order_id ? null : order.order_id)}
                        >
                          {order.rate > 0 && (
                            <span className='mx-1 text-irancell'>({order.rate}
                              <FontAwesomeIcon icon={faStar} className="" />)</span>
                          )}
                          <span>نظرسنجی</span>
                          <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                        </div>
                      )}
                    </div>

                    {/* فرم نظرسنجی */}
                    <div
                      className={`overflow-hidden transition-all duration-300`}
                      style={{ maxHeight: activeSurvey === order.order_id ? '500px' : '0' }}
                    >
                      <div className="mx-2 bg-gray-200 rounded p-2 mt-1 space-y-2">
                        {/* ستاره‌ها */}
                        <div className="flex justify-center text-2xl mt-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <FontAwesomeIcon
                              key={star}
                              icon={faStar}
                              className={`mx-1 transition-colors duration-200 cursor-pointer ${ratings[order.order_id] >= star ? "text-orange-500" : "text-gray-400"}`}
                              onClick={() => handleStarClick(order.order_id, star)}
                            />
                          ))}
                        </div>

                        {/* textarea */}
                        <textarea
                          className="w-full p-1 border border-gray-300 rounded text-[12px]"
                          placeholder="نظر خود را بنویسید..."
                          value={comments[order.order_id] || ""}
                          onChange={(e) => handleCommentChange(order.order_id, e.target.value)}
                        />

                        {/* دکمه ذخیره */}
                        <div className="flex justify-end mt-1">
                          <button
                            className={`text-white px-3 py-1 rounded bg-orange-500`}
                            disabled={!(ratings[order.order_id] > 0 && comments[order.order_id] !== "")}
                            onClick={() => handleSave(order.order_id)}
                          >
                            ذخیره
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* اطلاعات قیمت و کالری */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 border-l border-l-gray-300">
                        <div className="text-[10px]">قیمت</div>
                        <div className='pt-2 text-irancell'>
                          <span className="font-bold ">{order.price}</span>
                          <span className="text-[8px] mx-1">تومان</span>
                        </div>
                      </div>
                      <div className="p-2 ">
                        <div className="text-[10px]">کالری</div>
                        <div className="font-bold pt-2 text-black">
                          <span>{order.food_profile?.calory || 0}</span>
                        </div>
                      </div>
                      <div className="p-2 border-r border-r-gray-300">
                        <div className="text-[10px]">امتیاز</div>
                        <div className="font-bold pt-2 text-irancell">
                          <span className="font-bold">{order.food_profile?.rate || 0}</span>
                          <span> <FontAwesomeIcon icon={faStar} /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ViewForm;
