import React from "react";

const BmiForm = ({ t, formData, setFormData, handleSubmit, onCancel }) => {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {/* Height */}
        <div className="w-full md:w-[48%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t("profile.height")} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="50"
            max="250"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            className="w-full text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Weight */}
        <div className="w-full md:w-[48%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t("profile.weight")} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="40"
            max="200"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="w-full text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Gender */}
        <div className="w-full md:w-[48%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t("profile.gender")} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="" disabled>{t("profile.selectGender")}</option>
            <option value="man">{t("profile.male")}</option>
            <option value="woman">{t("profile.female")}</option>
          </select>
        </div>

        {/* Activity Level */}
        <div className="w-full md:w-[48%]">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {t("profile.activityLevel")} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.activity_value}
            onChange={(e) => setFormData({ ...formData, activity_value: e.target.value })}
            className="w-full text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="" disabled>{t("profile.selectActivityLevel")}</option>
            <option value="1.2">{t("profile.activity_level_1")}</option>
            <option value="1.375">{t("profile.activity_level_2")}</option>
            <option value="1.55">{t("profile.activity_level_3")}</option>
            <option value="1.725">{t("profile.activity_level_4")}</option>
            <option value="1.9">{t("profile.activity_level_5")}</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex gap-4 mt-6">
        <button
          className="flex-1 bg-orange-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-orange-600 transition"
          onClick={handleSubmit}
        >
          {t("calculate")}
        </button>
        <button
          className="flex-1 border border-gray-400 text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
          onClick={onCancel}
        >
          {t("cancel")}
        </button>
      </div>
    </>
  );
};

export default BmiForm;
