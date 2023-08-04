export default function formatTime(date) {
  const newDate = new Date(date);
  const hours = newDate.getUTCHours();
  const minutes = newDate.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  console.log(date);

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
