export default function formatDateToLongstring(date) {
  const newDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    newDate
  );

  return formattedDate;
}
