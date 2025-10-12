import { useState } from "react";
import {updateUserProfile,removeDelegator,createDelegator} from "../../api/profile/userProfileApi";

export const useLeftColumn = ({ userData, lang, t }) => {
  const [notifItems, setNotifItems] = useState([
    { key: "smsble", value: userData.smsble, loading: false },
    { key: "emailable", value: userData.emailable, loading: false },
    { key: "notif_status", value: userData.notif_status, loading: false },
    { key: "version_status", value: userData.version_status, loading: false },
  ]);

  const [toast, setToast] = useState(null);
  const [delegateUser, setDelegateUser] = useState({
    email: userData.delegator_email || "",
    id: userData.delegator_id || null,
  });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = async (idx) => {
    const updatedItems = [...notifItems];
    updatedItems[idx].value = !updatedItems[idx].value;
    updatedItems[idx].loading = true;
    setNotifItems(updatedItems);

    try {
      await updateUserProfile(lang, updatedItems[idx].key, updatedItems[idx].value);
      updatedItems[idx].loading = false;
      setNotifItems(updatedItems);

      showToast(
        t("profile.updateSuccess", { key: t(`profile.${updatedItems[idx].key}`) })
      );
    } catch (err) {
      console.error("Failed to update notification", err);
      updatedItems[idx].value = !updatedItems[idx].value;
      updatedItems[idx].loading = false;
      setNotifItems(updatedItems);

      showToast(
        t("profile.updateFailed", { key: t(`profile.${updatedItems[idx].key}`) })
      );
    }
  };

  const handleRemoveDelegator = async () => {
    if (!delegateUser.id) return;
    try {
      await removeDelegator(lang, delegateUser.id);
      setDelegateUser({ email: "", id: null });
      showToast(t("profile.delegateRemoved"));
    } catch (err) {
      console.error(err);
      showToast(t("profile.delegateRemoveFailed"));
    }
  };

  const handleCreateDelegator = async () => {
    if (!delegateUser.id) {
      showToast(t("profile.delegateEmailEmpty"));
      return;
    }
    try {
      await createDelegator(lang, delegateUser.id);
      showToast(t("profile.delegateAdded"));
    } catch (err) {
      console.error(err);
      showToast(t("profile.delegateAddFailed"));
    }
  };

  return {
    notifItems,
    toast,
    delegateUser,
    setDelegateUser,
    handleToggle,
    handleRemoveDelegator,
    handleCreateDelegator,
  };
};
