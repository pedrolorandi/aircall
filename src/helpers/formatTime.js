// Define a function to format time
export default function formatTime(date) {
  // Create a new Date object from the provided date
  const newDate = new Date(date);
  // Get the hours and minutes from the Date object
  const hours = newDate.getUTCHours();
  const minutes = newDate.getUTCMinutes();
  // Determine whether the time is AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Log the original date for debugging purposes
  console.log(date);

  // Format the hours to a 12-hour clock and handle the case where the hours are 0 (midnight)
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  // Format the minutes to always have two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
