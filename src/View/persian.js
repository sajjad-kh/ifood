export function persion(number) {
  return Number(number).toLocaleString('fa-IR', { useGrouping: false });
}

export function persionSlice(number) {
  return Number(number).toLocaleString('fa-IR'); // با جداکننده
}