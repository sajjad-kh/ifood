import { useState, useEffect, useRef } from "react";
import { hideNotification, getDayData } from "../../api/notification/notificationsApi";

export const useNotifications = (initialNotifications, language) => {
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  const [dayData, setDayData] = useState(null);
  const [loadingDay, setLoadingDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    if (initialNotifications?.length > 0) {
      timerRef.current = setTimeout(() => showNotification(0), 5000);
    }
    return () => clearTimeout(timerRef.current);
  }, [initialNotifications]);

  const showNotification = (notifIndex) => {
    clearTimeout(timerRef.current);
    if (current) setShow(false);

    setTimeout(() => {
      setCurrent(initialNotifications[notifIndex]);
      setShow(true);
      setIndex(notifIndex);

      const displayTime = 4500;
      if (notifIndex + 1 < initialNotifications.length) {
        timerRef.current = setTimeout(() => {
          setShow(false);
          setTimeout(() => showNotification(notifIndex + 1), 500);
        }, displayTime);
      } else {
        timerRef.current = setTimeout(() => setShow(false), displayTime);
      }
    }, current ? 500 : 0);
  };

  const handleHide = async (id) => {
    setShow(false);
    clearTimeout(timerRef.current);
    setTimeout(() => setCurrent(null), 500);
    if (id) await hideNotification(language, id);
  };

  const handleClickDate = async (miladiDate) => {
    if (!miladiDate) return;
    setLoadingDay(true);
    setSelectedDate(miladiDate);
    const res = await getDayData(language, miladiDate);
    setDayData(res);
    setLoadingDay(false);
  };

  return {
    current,
    show,
    index,
    dayData,
    loadingDay,
    selectedDate,
    setShow,
    setSelectedDate,
    setCurrent,
    setIndex,
    handleHide,
    handleClickDate,
    timerRef,
    showNotification,
  };
};
