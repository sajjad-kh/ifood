import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileView from './ProfileView';
import client from '../../api/client'; // فایل client.js شما

const Profile = () => {
  const { t,i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // state برای داده‌های کاربر و جدول
  const [userData, setUserData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18n.language || 'fa';

const healthItems = [
  { key: "age", label: t("profile.age"),pic:'Age.png' },
  { key: "height", label: t("profile.height"),pic:'HealthTime.png' },
  { key: "weight", label: t("profile.weight"),pic:'Weight.png' },
  { key: "bmi", label: t("profile.BMI"),pic:'BMI.png' },
  { key: "bmr", label: t("profile.basalMetabolicRate") ,pic:'BMR.png'},
  { key: "activity_value", label: t("profile.activityLevel"),pic:'Activity.png' },
  { key: "calories_required", label: t("profile.dailyCalorieNeeds"),pic:'Age.png' },
];

  const tableHeaders = [
    t("profile.weight"),
    t('profile.height'),
    t('profile.age'),
    "BMI",
    "BMR",
    t('profile.activityLevel'),
    t('profile.dailyCalorieNeeds'),
  ];

  const maxPages = 1;
  const pageNumber = 1;

  // 🔹 useEffect برای load اولیه
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // API Call اول: داده‌های کاربر
        const userResponse = await client.get(`/${lang}/users/user_profile.json`); 
        setUserData(userResponse.user);

        // API Call دوم: داده‌های جدول
        const tableResponse = await client.get(`/${lang}/users/bmi.json`); 
        setTableData(tableResponse);

      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // اگر هنوز داده‌ها لود نشده، می‌توان یک spinner یا متن لودینگ نشان داد
  if (loading || !userData) {
    return <div className="text-center py-10">{t("loading") || "Loading..."}</div>;
  }

  return (
    <ProfileView
      t={t}
      userData={userData}
      healthItems={healthItems}
      tableHeaders={tableHeaders}
      tableData={tableData}
      maxPages={maxPages}
      pageNumber={pageNumber}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      lang={lang}
    />
  );
};

export default Profile;
