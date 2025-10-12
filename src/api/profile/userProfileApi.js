import client from '../client';

// بروزرسانی نوتیفیکیشن‌ها یا سایر فیلدهای پروفایل
export const updateUserProfile = async (lang, key, value) => {
  const params = new URLSearchParams();
  params.append(`user[${key}]`, value);
  return client.put(`/${lang}/users/user_profile/`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
};

// حذف نماینده (delegator)
export const removeDelegator = async (lang, delegateId) => {
  const params = new URLSearchParams();
  params.append('delegate_id', delegateId);
  return client.delete(`/${lang}/users/user_profile/remove_delegator`, {
    data: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
};

// اضافه کردن نماینده (delegator)
export const createDelegator = async (lang, delegateId) => {
  return client.post(`/${lang}/users/user_profile/set_delegator?delegate_id=${delegateId}`);
};
