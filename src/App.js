import React from 'react';
import './App.css';
import './i18n';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Calendar from './View/calendar';
import CreditDetail from './View/credit/CreditDetail';
import Profile from './View/userProfile/profile'

function App() {
  const {
    i18n: { changeLanguage, language, dir },
  } = useTranslation();

  const changeLanguageOption = (e) => {
    changeLanguage(e.target.value);
  };

  const { t } = useTranslation();

  return (
    <Router>
      <div
        className="h-full w-full flex flex-col bg-gray-50 p-1"
        dir={dir()}
      >
        <Routes>
          <Route
            path="/calendar"
            element={
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="w-full m-2 p-2 mt-16 rounded-lg bg-[#E3F2FD]">
                  <Calendar userId={3580}/>
                </div>
              </div>
            }
          />
          <Route
            path="/credit-detail"
            element={
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="w-full h-screen m-2 p-2 mt-16 rounded-lg bg-[#E3F2FD]">
                  <CreditDetail userId={3580}/>
                </div>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="w-full m-2 p-2 mt-16 rounded-lg bg-[#E3F2FD]">
                  <Profile />
                </div>
              </div>
            }
          />
          {/* ریدایرکت به /calendar برای مسیرهای دیگر */}
          <Route
            path="*"
            element={
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="w-full m-2 p-2 mt-16 rounded-lg bg-[#E3F2FD]">
                  <Calendar userId={3580} />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
