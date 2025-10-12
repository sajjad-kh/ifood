// reservationUtils.js

/**
 * گرفتن رستوران‌های یکتا از delivery_places
 * @param {Array} dpObj
 * @returns {Array} uniqueRestaurants
 */
export const getUniqueRestaurants = (dpObj) => {
  return [...new Map(dpObj.map(dp => [dp.restaurant?.id, dp.restaurant])).values()].filter(Boolean);
};

/**
 * گرفتن پیمانکارها بر اساس رستوران انتخاب‌شده
 * @param {Array} dpObj
 * @param {number|string} restId
 * @returns {Array} uniqueVendors
 */
export const getVendorsByRestaurant = (dpObj, restId) => {
  const vendorList = dpObj
    .filter(dp => dp.restaurant?.id == restId)
    .map(dp => dp.vendor)
    .filter(Boolean);

  return [...new Map(vendorList.map(v => [v.id, v])).values()];
};

/**
 * گرفتن نوع غذاها بر اساس رستوران و پیمانکار
 * @param {Array} dpObj
 * @param {number|string} restId
 * @param {number|string} vendorId
 * @returns {Array} uniqueMeals
 */
export const getMealsByVendor = (dpObj, restId, vendorId) => {
  const mealList = dpObj
    .filter(dp => dp.restaurant?.id == restId && dp.vendor?.id == vendorId)
    .map(dp => dp.meal)
    .filter(Boolean);

  return [...new Map(mealList.map(m => [m.id, m])).values()];
};

/**
 * ادغام foodGroups با reserved_food ها و food های معمولی
 * @param {Array} categories
 * @returns {Array} mergedGroups
 */
export const mergeFoodGroups = (categories) => {
  return categories.map(group => {
    const reserved = group.reserved_food?.map(f => ({
      ...f,
      type: 'reserved',
      active: true,
      originalData: { count: f.count, takeaway_count: f.takeaway_count } // نگه داشتن نسخه اصلی
    })) || [];

    const foods = group.food?.map(f => ({
      ...f,
      type: 'normal',
      active: false
    })) || [];

    return { ...group, mergedFoods: [...reserved, ...foods], warning: false };
  });
};

/**
 * محاسبه مجموع تعداد سفارش‌ها در یک گروه
 * @param {Object} group
 * @returns {number} totalCount
 */
export const getGroupTotalCount = (group) => {
  return group.mergedFoods.reduce(
    (acc, f) => acc + (f.count || 0) + (f.takeaway_count || 0),
    0
  );
};

/**
 * گرفتن سفارش‌های جدید و ویرایش‌شده از foodGroups
 * @param {Array} foodGroups
 * @returns {Object} { newOrders, editedOrders }
 */
export const getOrdersFromFoodGroups = (foodGroups) => {
  const allFoods = foodGroups.flatMap(group =>
    group.mergedFoods.map(f => ({
      groupId: group.id,
      ...f
    }))
  );

  const newOrders = allFoods.filter(f => f.active && !f.order_id);

  const editedOrders = allFoods.filter(f => {
    if (!f.order_id) return false;
    const original = f.originalData || {};
    return (
      f.active && (
        f.count !== original.count ||
        f.takeaway_count !== original.takeaway_count
      )
    );
  });

  return { newOrders, editedOrders };
};
