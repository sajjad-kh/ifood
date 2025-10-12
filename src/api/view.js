import client from "../api/client";

// API دوم
export const fetchOtherApi = async (lang, date, deliveryPlaceId, setReservations, setData) => {
  try {
    const res = await client.get(`${lang}/delivery_places/${deliveryPlaceId}/reservations/reserve?date=${date}`);
    setReservations(res);
    setData(prev => ({ ...prev, reserve: { info: res } }));
    return res.data;
  } catch (err) {
    
    console.error("Error fetching other API:", err);
    return null;
  }
};

// API سوم
export const fetchThirdApi = async () => {
  try {
    const res = await client.post(`/current_credit.json`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || "خطا در دریافت اطلاعات";
    console.error("Error fetching other API:", message);
    return null;
  }
};

// API اول + دوم و سوم
export const fetchDayData = async (lang, date, setDeliveryPlaceObj, setLoadingDayData, setReservations, setData) => {
  try {
    setLoadingDayData(true);

    const dayDataRes = await client.get(`${lang}/delivery_places.json?date=${date}`);
    const defaultPlace = dayDataRes?.default_delivery_place;
    setDeliveryPlaceObj(dayDataRes?.delivery_places);

    const api2Promise = defaultPlace
      ? fetchOtherApi(lang, date, defaultPlace, setReservations, setData)
      : Promise.resolve(null);

    const api3Promise = defaultPlace
      ? fetchThirdApi(date, defaultPlace)
      : Promise.resolve(null);

    const [api2Data, api3Data] = await Promise.all([api2Promise, api3Promise]);

    return {
      ...dayDataRes.data,
      api2Data,
      api3Data,
    };
  } catch (err) {
    console.error("Error fetching day data:", err);
    return null;
  } finally {
    setLoadingDayData(false);
  }
};

// API روزهای گذشته
export const fetchPastDayData = async (lang, date) => {
  try {
    const res = await client.get(`${lang}/day?date=${date}`);
    console.log("res",res)
    return res;
  } catch (err) {
    console.error("خطا در API گذشته:", err);
    return null;
  }
};
