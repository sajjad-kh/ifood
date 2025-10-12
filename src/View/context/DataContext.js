import { createContext, useContext, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState({
    data: {},    // همه دیتاها با key ذخیره میشه
    loading: {},
    error: {},
  });

  // ست کردن دیتا با key
  const setData = (key, data) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [key]: data }
    }));
  };

  // ست کردن لودینگ
  const setLoading = (key, value) => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, [key]: value }
    }));
  };

  // ست کردن خطا
  const setError = (key, msg) => {
    setState(prev => ({
      ...prev,
      error: { ...prev.error, [key]: null }
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        error: { ...prev.error, [key]: msg }
      }));
    }, 10);
  };

  // متد عمومی برای همه درخواست‌ها
  const callApi = async ({ key, url, method = "GET", params = {}, body = null }) => {
    try {
      setLoading(key, true);
      setError(key, null);

      const res = await axios({
        url,
        method,
        params,
        data: body,
        headers: { "Content-Type": "application/json" },
      });

      setData(key, res.data);
      console.log("eeeee",res.data)
      return res.data;
    } catch (err) {
       console.log("eeeee11111")
      setError(key, err.message || "خطا در ارتباط با سرور");
      throw err;
    } 
  };

  return (
    <DataContext.Provider value={{ state, setData, setLoading, setError, callApi }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
