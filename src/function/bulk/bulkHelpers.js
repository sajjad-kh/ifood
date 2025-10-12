// helpers.js
export const handleCheck = (date, selectedDates, setSelectedDates, counts, setCounts) => {
  const newChecked = !selectedDates[date];
  setCounts(prevCounts => ({
    ...prevCounts,
    [date]: newChecked ? { ...prevCounts[date], restaurant: 1 } : { restaurant: 0, takeaway: 0 },
  }));
  setSelectedDates(prev => ({ ...prev, [date]: newChecked }));
};

export const handleCountChange = (date, type, delta, counts, setCounts) => {
  setCounts(prev => ({
    ...prev,
    [date]: { ...prev[date], [type]: Math.max(0, prev[date][type] + delta) },
  }));
};

export const handleTimeChange = (date, value, setSelectedTimeFrame) => {
  setSelectedTimeFrame(prev => ({ ...prev, [date]: value }));
};

export const activateAll = (data, selectedDates, counts, setSelectedDates, setCounts, type) => {
  if (!data) return;
  const newSelectedDates = { ...selectedDates };
  const newCounts = { ...counts };
  data.food_programs.forEach(program => {
    newSelectedDates[program.date] = true;
    newCounts[program.date] = { ...newCounts[program.date], [type]: 1 };
  });
  setSelectedDates(newSelectedDates);
  setCounts(newCounts);
};

export const handleReserve = async (data, selectedDates, counts, selectedTimeFrame, food, selectedMeal, lang, bulkReserve, onClose) => {
  if (!data) return;
  const items = [];
  let index = 0;

  data.food_programs.forEach(program => {
    if (selectedDates[program.date]) {
      const restaurantCount = counts[program.date]?.restaurant || 0;
      const takeawayCount = counts[program.date]?.takeaway || 0;
      const windowNumber = selectedTimeFrame[program.date] || "";
      const timeObj = program.delivery_place_times?.find(t => t.window_number === Number(windowNumber));
      items.push({
        [`items[${index}][food_id]`]: food,
        [`items[${index}][delivery_place_id]`]: selectedMeal,
        [`items[${index}][window]`]: windowNumber,
        [`items[${index}][start_time]`]: timeObj?.start_time || "",
        [`items[${index}][end_time]`]: timeObj?.end_time || "",
        [`items[${index}][order][date]`]: program.date,
        [`items[${index}][order][takeaway_count]`]: takeawayCount,
        [`items[${index}][order][count]`]: restaurantCount,
      });
      index++;
    }
  });

  try {
    await bulkReserve(lang, items);
    onClose();
  } catch (err) {
    console.error("❌ خطا در رزرو:", err);
  }
};
