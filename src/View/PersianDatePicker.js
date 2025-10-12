import React, { useState } from 'react';
import DatePicker from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

export default function TestDatePicker() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <DatePicker
        value={selectedDay}
        onChange={setSelectedDay}
        locale="fa"
        inputPlaceholder="تاریخ را انتخاب کنید"
      />
    </div>
  );
}