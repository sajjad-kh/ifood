// reservationApi.js
import client from '../../api/client';

/**
 * لغو سفارش
 * @param {string|number} orderId 
 * @param {string|number} deliveryPlaceId 
 * @param {string} lang 
 */
export const cancelOrder = async (orderId, deliveryPlaceId, lang) => {
  try {
    await client.put(`/${lang}/orders/${orderId}/cancel`, null, {
      params: { delivery_place_id: deliveryPlaceId },
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("خطا در لغو سفارش:", err);
    throw err;
  }
};

/**
 * ثبت رستوران پیش‌فرض
 * @param {string|number} restId 
 * @param {string} lang 
 */
export const setDefaultRestaurant = async (restId, lang) => {
  try {
    await client.post(`/${lang}/delivery_places/${restId}/reservations/default_delivery_place`, null, {
      params: { delivery_place_id: restId }
    });
  } catch (err) {
    console.error("خطا در ثبت پیش‌فرض:", err);
    throw err;
  }
};

/**
 * گرفتن لیست رستوران‌ها
 * @param {string} lang 
 * @returns {Promise<Array>}
 */
export const fetchRestaurants = async (lang) => {
  try {
    const res = await client.get(`/${lang}/delivery_places`);
    return res.data;
  } catch (err) {
    console.error("خطا در دریافت رستوران‌ها:", err);
    return [];
  }
};

/**
 * گرفتن لیست پیمانکارها
 * @param {string} lang 
 * @param {string|number} restId
 * @returns {Promise<Array>}
 */
export const fetchVendors = async (lang, restId) => {
  try {
    const res = await client.get(`/${lang}/delivery_places/${restId}/vendors`);
    return res.data;
  } catch (err) {
    console.error("خطا در دریافت پیمانکارها:", err);
    return [];
  }
};

/**
 * گرفتن لیست غذاها
 * @param {string} lang 
 * @param {string|number} restId 
 * @param {string|number} vendorId
 * @returns {Promise<Array>}
 */
export const fetchMeals = async (lang, restId, vendorId) => {
  try {
    const res = await client.get(`/${lang}/delivery_places/${restId}/vendors/${vendorId}/meals`);
    return res.data;
  } catch (err) {
    console.error("خطا در دریافت غذاها:", err);
    return [];
  }
};

export const getOrdersByMeal = async ({  date, lang ,mealId}) => {
  return client.get(`${lang}/delivery_places/${mealId}/reservations/reserve?date=${date}`);
};
