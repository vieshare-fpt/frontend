
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

export  function formatOneDay(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate() - 7),
  ].join("-");
}

export  function formatOneMonth(date) {
  date.setMonth(date.getMonth() - 12);
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1 ),
  ].join("-");
}

export  function formatOneYear(date) {
  return [
    date.getFullYear() - 7,
  ].join("-");
}