import React from "react";

const ConfirmModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <p className="mb-4 text-center">آیا مطمئن هستید؟</p>
        <div className="flex justify-around">
          <button
            className="m-1 py-2 bg-red-500 text-white rounded w-full flex-1"
            onClick={onCancel}
          >
            لغو
          </button>
          <button
            className="m-1 py-2 bg-green-500 text-white rounded w-full flex-1"
            onClick={onConfirm}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
