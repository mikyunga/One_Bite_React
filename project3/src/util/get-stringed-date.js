export const getStringDate = (targetDate) => {
  // YYYY-MM-DD 형태
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  // 문자열이니까 1의자리는 01로 출력이 안되므로 강제로 형태 맞춤
  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
