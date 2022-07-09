
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export default function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export const dateFormat = (date) => {
 const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',

  };
  return new Intl.DateTimeFormat("en-US",options).format(new Date(date));
};
