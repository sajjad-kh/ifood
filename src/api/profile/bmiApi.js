import client from "../client";

// اضافه کردن داده‌های BMI
export const addBmiData = async (lang, formData) => {
  const bmi_data = new URLSearchParams();
  bmi_data.append("bmi_data[height]", formData.height);
  bmi_data.append("bmi_data[weight]", formData.weight);
  bmi_data.append("bmi_data[activity_value]", formData.activity_value);
  bmi_data.append("bmi_data[gender]", formData.gender);

  const response = await client.post(`${lang}/users/bmi/`, bmi_data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response;
};

// ویرایش داده‌های BMI
export const updateBmiData = async (lang, formData) => {
  const bmi_data = new URLSearchParams();
  bmi_data.append("bmi_data[height]", formData.height);
  bmi_data.append("bmi_data[weight]", formData.weight);
  bmi_data.append("bmi_data[activity_value]", formData.activity_value);
  bmi_data.append("bmi_data[gender]", formData.gender);

  const response = await client.put(`${lang}/users/bmi/`, bmi_data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response;
};
