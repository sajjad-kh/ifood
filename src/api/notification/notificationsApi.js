import client from "../client";

export const hideNotification = async (language, id) => {
  if (!id) return false;
  try {
    const data = new URLSearchParams();
    data.append("notification_id", id);
    const res = await fetch(`${language}/dashboard/notifications/update`, {
      method: "PUT",
      body: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.ok;
  } catch (err) {
    console.error("Error hiding notification:", err);
    return false;
  }
};

export const getDayData = async (language, miladiDate) => {
  if (!miladiDate) return null;
  try {
    const res = await client.get(`${language}/day?date=${miladiDate}`);
    return res;
  } catch (err) {
    console.error("Error fetching day data:", err);
    return null;
  }
};

export const downloadQR = (id, filename) => {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

  const link = document.createElement("a");
  link.href = pngUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
