import client from "../client";

export const createReservation = async ({ lang, apiInfo, onClose }) => {
  console.log("apiInfo",apiInfo)
  if (!apiInfo.reservations?.delivery_place_id) {
    throw new Error("لطفاً ابتدا رستوران را انتخاب کنید");
  }

  const { newOrders = [], editedOrders = [] } = apiInfo.reserved || {};

  // 👇 اگر هیچ سفارشی وجود نداشت، مودال رو ببند
  if (newOrders.length === 0 && editedOrders.length === 0) {
    if (typeof onClose === "function") {
      onClose(); // همون تابعی که توی MonthView برای بستن مودال دادی
    }
    return null; // دیگه API هم صدا نمی‌زنیم
  }

  const basePayload = {
    delivery_date: apiInfo?.selectedDate,
    delivery_place_id: apiInfo.reservations?.delivery_place_id,
    start_time: apiInfo.reservations?.delivery_place_times[0].start_time,
    window: apiInfo.reservations?.delivery_place_times[0].window_number,
    end_time: apiInfo.reservations?.delivery_place_times[0].end_time,
  };

  let lastResponse = null;

  try {
    if (editedOrders.length && newOrders.length) {
      // اول API ویرایشی
      const editedPayload = {
        ...basePayload,
        orders: editedOrders.map(item => ({
          food_id: item.id,
          count: item.count,
          takeaway_count: item.takeaway_count || 0,
        })),
      };
      await client.put(`/${lang}/orders/update`, editedPayload);

      // بعد API جدیدها
      const newPayload = {
        ...basePayload,
        orders: newOrders.map(item => ({
          food_id: item.id,
          count: item.count,
          takeaway_count: item.takeaway_count || 0,
        })),
      };
      lastResponse = await client.post(`/${lang}/orders`, newPayload, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } else if (editedOrders.length) {
      const editedPayload = {
        ...basePayload,
        orders: editedOrders.map(item => ({
          food_id: item.id,
          count: item.count,
          takeaway_count: item.takeaway_count || 0,
        })),
      };
      lastResponse = await client.put(`/${lang}/orders/update`, editedPayload);
    } else if (newOrders.length) {
      const newPayload = {
        ...basePayload,
        orders: newOrders.map(item => ({
          food_id: item.id,
          count: item.count,
          takeaway_count: item.takeaway_count || 0,
        })),
      };
      lastResponse = await client.post(`/${lang}/orders`, newPayload);
    }

    return lastResponse;
  } catch (err) {
    console.error("❌ خطا در رزرو:", err);
    throw err;
  }
};
