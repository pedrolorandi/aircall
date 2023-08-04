export default function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US");
  return formattedDate;
}
