
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export  function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export  function formatOneDay(date, number) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate() - number),
  ].join("-");
}

export  function formatOneMonth(date, number) {
  date.setMonth(date.getMonth() - number);
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1 ),
  ].join("-");
}

export  function formatOneYear(date, number) {
  return [
    date.getFullYear() - number,
  ].join("-");
}