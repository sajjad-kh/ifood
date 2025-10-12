// RightModal.js
import React, { useEffect, useState } from 'react';
import { useData } from "./context/DataContext";
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { createReservation } from "../api/reservation/reservationOrders";

const RightModal = ({ isOpen, onClose, title, children, footer, apiInfo }) => {
  const { state, setError, callApi } = useData();
  const [showError, setShowError] = useState(false);
  const [errorCounter, setErrorCounter] = useState(0);
  const [errorColor, setErrorColor] = useState('bg-red-100 text-red-400');
  const [reserving, setReserving] = useState(false);

  const { i18n } = useTranslation();
  const lang = i18n.language || 'fa';

  // کلید مخصوص این مودال
  const KEY = "reservation";

  useEffect(() => {
    const error = state[KEY]?.error;
    if (error) {
      setErrorCounter(prev => prev + 1);
      if (error.includes('warning')) setErrorColor('bg-red-100 text-red-400');
      else if (error.includes('success')) setErrorColor('bg-green-100 text-green-700');
      else setErrorColor('bg-gray-400 text-white');
    }
  }, [state[KEY]?.error]);

  useEffect(() => {
    if (!state[KEY]?.error) return;
    setShowError(true);
    const timer = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(timer);
  }, [errorCounter]);

  if (!isOpen) return null;

  const handleReserve = async () => {
    setReserving(true);
    try {
      // صدا زدن متد عمومی از DataContext
      const response = await callApi({
        key: KEY,
        url: createReservation.url,
        method: "POST",
        body: { lang, ...apiInfo }
      });

      if (response.status === 200) {
        setError(KEY, "success||رزرو با موفقیت انجام شد");
        onClose();
      } else {
        setError(KEY, "warning||خطا در رزرو");
      }
    } catch (err) {
      console.error(err);
      setError(KEY, `warning||${err.message || "خطا در ارسال درخواست رزرو"}`);
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2
                 w-full sm:w-[70%] md:w-[50%] h-full sm:h-[95vh] bg-gray-100 shadow-lg z-50 flex flex-col
                 transition-transform duration-500 ease-in-out rounded-l sm:rounded-l"
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 h-auto sm:h-12 gap-2">
        <div className="text-sm font-semibold text-gray-800 title_Modal">{title}</div>
        {showError && state[KEY]?.error && (
          <p className={`${errorColor} p-2 rounded text-xs w-full sm:w-7/12 text-center`}>
            {state[KEY].error.split("||")[1]}
          </p>
        )}
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-2xl font-bold leading-none self-end sm:self-auto"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div className="p-2 flex-1 overflow-y-auto">{children}</div>
      {footer && (
        <div className="flex flex-col sm:flex-row gap-2 p-2 text-[10px]">
          <button
            onClick={() => createReservation({lang, apiInfo, onClose})}
            disabled={reserving}
            className="flex-1 bg-orange-500 text-white rounded py-2 flex justify-center items-center gap-2"
          >
            {reserving && <FontAwesomeIcon icon={faSpinner} spin />}
            رزرو
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-400 text-black rounded py-2"
          >
            لغو
          </button>
        </div>
      )}
    </div>
  );
};

export default RightModal;
