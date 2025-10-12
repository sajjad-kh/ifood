import React, { useEffect, useState } from "react";

const Loader = ({ loading }) => {
  const [show, setShow] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500); // مدت fadeOut
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-100/70 z-50
        transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0"}`}
    >
      <svg
        className="animate-spin h-16 w-16 text-orange-500"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  );
};

export default Loader;
