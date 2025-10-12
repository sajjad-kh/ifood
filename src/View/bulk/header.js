import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onClose }) => (
  <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center p-4 h-auto sm:h-12 gap-2">
    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-md font-bold leading-none self-end sm:self-auto">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  </div>
);

export default Header;
