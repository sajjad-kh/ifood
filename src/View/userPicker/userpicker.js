import React, { useState, useEffect, useRef } from "react";
import client from "../../api/client";

const UserPicker = ({
  t = (s) => s,
  onSelect,
  minLength = 3,
  placeholder = "ایمیل کاربر را وارد کنید",
  className = "",
  value={value}
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (query.length < minLength) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    let cancel = false;
    setLoading(true);

    client
      .get(`/fa/users/user_profile/search_user?email=${query}`)
      .then((res) => {
        if (!cancel) {
          setResults(res || []);
          setShowDropdown(res.length > 0);
        }
      })
      .catch(() => {
        if (!cancel) setResults([]);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [query, minLength]);

  // بستن dropdown وقتی خارج از کامپوننت کلیک شد
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (user) => {
    setQuery(user.email);
    setResults([]);      
    setShowDropdown(false); 
    if (onSelect) onSelect(user);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length >= minLength) {
      setShowDropdown(true); 
    } else {
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    if (query.length >= minLength && results.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <input
        type="text"
        value={query||value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full border rounded px-3 py-2 ${className}`}
        onFocus={handleFocus}
      />

      {loading && (
        <div className="absolute right-3 top-2 text-xs text-gray-400"></div>
      )}

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto shadow">
          {results.map((user) => (
            <li
              key={user.id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(user);
              }}
              className="px-3 py-2 hover:bg-orange-100 cursor-pointer text-sm"
            >
              <div><span className="text-[14px]">{user.email}</span></div>
              <div>
                <span className="text-[10px] font-bold">{t("profile.userName")+": "}</span>
                <span className="text-[10px]">{user.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPicker;
