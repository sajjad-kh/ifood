// ReserveForm.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import { useData } from "./context/DataContext";
import OrderSummary from "./reservation/OrderSummary";
import CaleryForm from './caleryForm';
import ConfirmModal from './reservation/ConfirmModal'; 
import ReserveSelectors from "./reservation/ReserveSelectors";
import FoodGroupList from './reservation/FoodGroupList';

import BulkModal from './bulk/bulkModal';
 
import {
getUniqueRestaurants,
getVendorsByRestaurant,
getMealsByVendor,
mergeFoodGroups,
getOrdersFromFoodGroups,
getGroupTotalCount
} from './reservation/reservationUtils';

import { cancelOrder, setDefaultRestaurant,getOrdersByMeal  } from '../api/reservation/reservationApi';

const ReserveForm = ({ date, dpObj = [], reservations = [], onReservedChange}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'fa';
  const { setError } = useData();

  const [restaurants, setRestaurants] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedRest, setSelectedRest] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [foodGroups, setFoodGroups] = useState([]);
  const [loadingDefault, setLoadingDefault] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, groupIndex: null, foodIndex: null });
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const reserveOBJ = reservations;

  const [showCaleryForm, setShowCaleryForm] = useState(false);

  const [isBulkOpen, setIsBulkOpen] = useState(false);

  // ست کردن رستوران‌ها
  useEffect(() => {
    if (!dpObj.length) return;
    const uniqueRest = getUniqueRestaurants(dpObj);
    setRestaurants(uniqueRest);
    const defaultRest = uniqueRest.find(r => r.name === reserveOBJ.restaurant);
    if (defaultRest) setSelectedRest(defaultRest.id);
  }, [dpObj]);

  // ست کردن پیمانکارها بعد از انتخاب رستوران
  useEffect(() => {
    if (!selectedRest) return;
    setVendors(getVendorsByRestaurant(dpObj, selectedRest));
    const defaultVendor = getVendorsByRestaurant(dpObj, selectedRest).find(v => v.name === reserveOBJ.vendor);
    if (defaultVendor) setSelectedVendor(defaultVendor.id);
  }, [selectedRest, dpObj, reserveOBJ.vendor]);

  // ست کردن نوع غذا بعد از انتخاب پیمانکار
  useEffect(() => {
    if (!selectedRest || !selectedVendor) return;
    
    const newMeals = getMealsByVendor(dpObj, selectedRest, selectedVendor);
    setMeals(newMeals);

    if (newMeals.length === 1) {
      const onlyMeal = newMeals[0];
      setSelectedMeal(onlyMeal.id);
      mealChanged(onlyMeal.id); 
      mealChanged(onlyMeal.id);
    }else{
      setSelectedTime('');
    }
  }, [selectedRest, selectedVendor, dpObj]);

  // ست کردن زمان و foodGroups
  useEffect(() => {
    if (reserveOBJ?.window_numbner !== undefined) setSelectedTime(reserveOBJ.window_numbner);
    if (reserveOBJ.categories?.length) setFoodGroups(mergeFoodGroups(reserveOBJ.categories));
  }, [reserveOBJ]);

  // هر بار foodGroups تغییر کرد → reserved آپدیت بشه
  useEffect(() => {
    if (!onReservedChange) return;
    const { newOrders, editedOrders } = getOrdersFromFoodGroups(foodGroups);
    onReservedChange({ newOrders, editedOrders });
  }, [foodGroups, onReservedChange]);

  const restChanged = (restId) => {
    setSelectedRest(restId);
    setSelectedVendor('');
    setSelectedMeal('');
    setSelectedTime(''); 
    setFoodGroups([]);
    setVendors(getVendorsByRestaurant(dpObj, restId));
    setMeals([]);
  };

  const vendorChanged = (vendorId) => {
    setSelectedVendor(vendorId);
    setSelectedMeal('');
    setSelectedTime(''); 
    setFoodGroups([]);  
    setMeals(getMealsByVendor(dpObj, selectedRest, vendorId));
  };

  const mealChanged = async (mealId) => {
    setSelectedMeal(mealId);
    setSelectedTime('');
    setFoodGroups([]);
    if (!mealId || !selectedRest || !selectedVendor) return;
    try {
      const response = await getOrdersByMeal({mealId,date: date,lang});

      if (response?.categories?.length) setFoodGroups(mergeFoodGroups(response.categories));
      else setFoodGroups([]);
     

      if (Array.isArray(response?.delivery_place_times)) {
        if (response.delivery_place_times.length === 1) {
          const onlyTime = response.delivery_place_times[0];
          setSelectedTime(onlyTime?.window_number ?? '');
        } else {
          setSelectedTime('');   
        }
      } else {
        setSelectedTime(''); 
      }
    } catch (err) {
      setError("warning||خطا در دریافت سفارش‌های جدید");
      setFoodGroups([]);
    }
  };

  const toggleFoodActive = (groupIndex, foodIndex) => {
    const food = foodGroups[groupIndex].mergedFoods[foodIndex];
    if (food.order_id) {
      setConfirmModal({ isOpen: true, groupIndex, foodIndex });
    } else {
      updateFoodActive(groupIndex, foodIndex, !food.active);
    }
  };

  const updateFoodActive = async (groupIndex, foodIndex, newActive) => {
    setFoodGroups(prevGroups => {
      const groupsCopy = prevGroups.map(group => ({ ...group, mergedFoods: group.mergedFoods.map(f => ({ ...f })) }));
      const food = groupsCopy[groupIndex].mergedFoods[foodIndex];

      if (!food.order_id) {
        if (!food.active && newActive) food.count = 1;
        else if (food.active && !newActive) {
          food.count = 0;
          food.takeaway_count = 0;
        }
      }

      food.active = newActive;
      groupsCopy[groupIndex].warning = getGroupTotalCount(groupsCopy[groupIndex]) > groupsCopy[groupIndex].limit;

      if (food.order_id && !newActive) {
        cancelOrder(food.order_id, selectedRest, lang).catch(() => {
          alert("خطا در بروزرسانی سفارش");
        });
      }

      return groupsCopy;
    });
  };

  const handleConfirmModal = (confirmed) => {
    if (confirmed) updateFoodActive(confirmModal.groupIndex, confirmModal.foodIndex, false);
    setConfirmModal({ isOpen: false, groupIndex: null, foodIndex: null });
  };

  const setDefaultSelection = async () => {
    if (!selectedRest) {
      setError("warning||لطفاً ابتدا رستوران را انتخاب کنید");
      return;
    }
    setLoadingDefault(true);
    try {
      await setDefaultRestaurant(selectedRest, lang);
      setError("success||انتخاب پیش‌فرض با موفقیت ثبت شد");
    } catch (err) {
      setError("warning||خطا در ثبت پیش‌فرض");
    } finally {
      setLoadingDefault(false);
    }
  };

  const changeCount = (groupIndex, foodIndex, type, field) => {
    setFoodGroups(prevGroups => {
      const groupsCopy = prevGroups.map(group => ({ ...group, mergedFoods: group.mergedFoods.map(f => ({ ...f })) }));
      const food = groupsCopy[groupIndex].mergedFoods[foodIndex];
      const current = food[field] || 0;
      if (type === '+') food[field] = current + 1;
      if (type === '-' && current > 0) food[field] = current - 1;
      groupsCopy[groupIndex].warning = getGroupTotalCount(groupsCopy[groupIndex]) > groupsCopy[groupIndex].limit;
      return groupsCopy;
    });
  };

  const totalOrders = foodGroups.reduce((acc, g) => acc + getGroupTotalCount(g), 0);
  const totalAmount = foodGroups.reduce((acc, group) => {
    const groupSum = group.mergedFoods.reduce((sum, food) => {
      const price = food.price || 0;
      const count = food.count || 0;
      const takeaway = food.takeaway_count || 0;
      return sum + price * (count + takeaway);
    }, 0);
    return acc + groupSum;
  }, 0);

  const totalCalories = foodGroups.reduce((acc, group) => {
    return acc + group.mergedFoods.reduce((sum, food) => {
      const count = food.count || 0;
      const takeaway = food.takeaway_count || 0;
      const calories = food.calory || 0; 
      return sum + calories * (count + takeaway);
    }, 0);
  }, 0);
  return (
    <>
      {showCaleryForm && <CaleryForm date={date} />}

      {!showCaleryForm && (
        <div className="flex flex-col h-full max-h-[80vh] text-xs">
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <div className="bg-white p-1 rounded shadow-md flex gap-2">
              <button className="px-2 p-1 rounded bg-irancell text-white flex-1" type="button">رزرو غذا</button>
              <button className="px-4 py-2 rounded text-gray-400 flex-1" type="button" 
               onClick={() => setShowCaleryForm(true)}
              >مشاهده کالری</button>
            </div>

            <ReserveSelectors restaurants={restaurants} vendors={vendors} meals={meals} selectedRest={selectedRest} selectedVendor={selectedVendor} selectedMeal={selectedMeal} selectedTime={selectedTime} selectedDate={selectedDate} onRestChange={restChanged} onVendorChange={vendorChanged} onMealChange={mealChanged} onTimeChange={setSelectedTime} onDateChange={setSelectedDate} onSetDefault={setDefaultSelection} loadingDefault={loadingDefault} reserveOBJ={reserveOBJ}
            />

            <FoodGroupList foodGroups={foodGroups} toggleFoodActive={toggleFoodActive} changeCount={changeCount}  setIsBulkOpen={setIsBulkOpen} selectedMeal={selectedMeal}
            />

            <OrderSummary totalOrders={totalOrders} totalAmount={totalAmount} totalCalories={totalCalories} requiredCalories={reserveOBJ.calories_required} qr={reserveOBJ.qr}
            />
          </div>

          {confirmModal.isOpen && (
            <ConfirmModal onCancel={() => handleConfirmModal(false)} onConfirm={() => handleConfirmModal(true)}
            />
          )}

          {/* {isBulkOpen && (
            <BulkModal 
              isOpen={isBulkOpen}
              onClose={() => setIsBulkOpen(false)}
              title={selectedDate}
              apiInfo={{food_id:"ww", delivery_place_id:"11"}}
            >
            </BulkModal>)}*/}



        </div>
      )}
    </>
  );
};

export default ReserveForm;
