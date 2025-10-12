import client from "../../api/client";

/**
 * دریافت اطلاعات bulk menu برای یک غذا و رستوران مشخص
 */
export const fetchBulkMenu = async (foodId, deliveryPlaceId) => {
  try {
    const response = await client.get(
      `/fa/delivery_places/${deliveryPlaceId}/reservations/bulk_menu.json`,
      { params: { food_id: foodId, delivery_place_id: deliveryPlaceId } }
    );
    return response;
  } catch (err) {
    console.error("Error fetching bulk menu:", err);
    throw err;
  }
};

/**
 * رزرو دسته‌ای غذا
 * @param {string} lang - زبان (fa/en)
 * @param {Array} items - آرایه آیتم‌ها برای رزرو
 */
export const bulkReserve = async (lang, items) => {
  try {
    const params = new URLSearchParams();
    items.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => params.append(key, value));
    });
    const response = await client.post(`/${lang}/orders/bulk_create.json`, params);
    return response;
  } catch (err) {
    console.error("Error in bulk reservation:", err);
    throw err;
  }
};
