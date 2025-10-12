// LeftColumn.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import UserPicker from "../userPicker/userpicker";
import { useLeftColumn } from "../../function/userProfile/useLeftColumn";

const LeftColumn = ({ t, userData }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "fa";

  const {
    notifItems,
    toast,
    delegateUser,
    setDelegateUser,
    handleToggle,
    handleRemoveDelegator,
    handleCreateDelegator,
  } = useLeftColumn({ userData, lang, t });

  return (
    <div className="bg-gray-100 rounded flex flex-col justify-start p-4 text-xs w-full md:w-[30%]">
      {/* Avatar و اطلاعات */}
      <div className="w-full border-b border-gray-200 flex flex-col items-center gap-2 pb-4">
        {userData.avatar ? (
          <img
            src={userData.avatar}
            alt="avatar"
            className="border border-orange-400 rounded-full w-24 h-24 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 border border-orange-400" />
        )}
        <div className="text-sm font-medium text-black">{userData.name}</div>
        <div className="px-3 py-1 flex items-center gap-2 text-xs">
          <span className="text-gray-400">{userData.sn}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="w-full border-b border-gray-200 text-xs text-right py-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">{t("profile.phone")}:</span>
          <span>{userData.mobile}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">{t("profile.birthday")}:</span>
          <span>{userData.dob}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">{t("profile.email")}:</span>
          <span>{userData.email}</span>
        </div>
      </div>

      {/* Delegate Email */}
      <div className="w-full border-b border-gray-200 text-xs py-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-right">{t("profile.delegateUserEmail")}:</span>
          <span className="text-left">
            { userData?.delegator?.email ? (
              <button
                className="bg-red-200 hover:bg-red-500 text-white px-2 py-1 rounded text-[10px]"
                onClick={handleRemoveDelegator}
              >
                {t("remove")}
              </button>
            ) : (
              <button
                className="bg-orange-300 hover:bg-orange-500 text-white px-2 py-1 rounded text-[10px]"
                onClick={handleCreateDelegator}
              >
                {t("add")}
              </button>
            )}
          </span>
        </div>

        <UserPicker
          t={t}
          placeholder={t("profile.inputDelegateUserEmail")}
          onSelect={(user) =>
            setDelegateUser({ email: user.email, id: user.id })
          }
          className="text-xs"
          value={delegateUser.email || userData?.delegator?.email || ""}
        />
      </div>

      {/* Notification Checkboxes */}
      <div className="w-full flex flex-col gap-3 items-end text-right py-4">
        {notifItems.map((item, idx) => (
          <label
            key={idx}
            className="flex flex-row-reverse items-center justify-end w-full text-xs"
          >
            <span>{t(`profile.${item.key}`)}</span>
            <input
              type="checkbox"
              className="form-switch mx-1 accent-orange-500"
              checked={item.value}
              onChange={() => handleToggle(idx)}
              disabled={item.loading}
            />
          </label>
        ))}
      </div>

      {/* Toast پیام */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-orange-500 text-white text-sm px-4 py-2 rounded shadow-md z-50">
          {toast}
        </div>
      )}
    </div>
  );
};

export default LeftColumn;
