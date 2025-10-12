import React, { useState, useEffect } from "react";
import Header from "../Header";
import RightModal from "../RightModal";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import BmiForm from "./BmiForm";
import { addBmiData, updateBmiData } from "../../api/profile/bmiApi";

const ProfileView = ({
  t,
  healthItems,
  userData,
  tableHeaders,
  tableData,
  maxPages,
  pageNumber,
  lang,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [bmiData, setBmiData] = useState(tableData.bmidata || []);

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    activity_value: "",
    gender: "",
  });

  useEffect(() => {
    setFormData(
      selectedRow
        ? {
            height: selectedRow.height,
            weight: selectedRow.weight,
            age: selectedRow.age,
            activity_value: selectedRow.activity_value,
            gender: selectedRow.gender || "",
          }
        : { height: "", weight: "", age: "", activity_value: "", gender: "" }
    );
  }, [selectedRow, isModalOpen]);

  const handleSubmit = async () => {
    try {
      if (selectedRow) {
        const updated = await updateBmiData(lang, formData);
        setBmiData((prev) =>
          prev.map((row) => (row.id === selectedRow.id ? updated : row))
        );
      } else {
        const newRow = await addBmiData(lang, formData);
        setBmiData((prev) => [...prev, newRow]);
      }
      setIsModalOpen(false);
      setSelectedRow(null);
    } catch (error) {
      console.error("Error saving BMI data:", error);
      alert("خطا در ذخیره داده‌ها، لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <div className="relative bg-white rounded-lg">
      <Header />
      <div className="flex flex-col md:flex-row h-full w-full bg-white rounded shadow-md text-gray-800 p-4 gap-4">
        <LeftColumn t={t} userData={userData} />
        <RightColumn
          t={t}
          healthItems={healthItems}
          tableHeaders={tableHeaders}
          tableData={{ ...tableData, bmidata: bmiData }}
          maxPages={maxPages}
          pageNumber={pageNumber}
          setIsModalOpen={setIsModalOpen}
          setSelectedRow={setSelectedRow}
        />
      </div>

      <RightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRow ? t("profile.editRow") : t("profile.addRow")}
      >
        <BmiForm
          t={t}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </RightModal>
    </div>
  );
};

export default ProfileView;
