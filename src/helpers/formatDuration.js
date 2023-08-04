export default function formatDuration(seconds) {
  const units = [
    { value: 86400, label: "day" },
    { value: 3600, label: "hour" },
    { value: 60, label: "minute" },
    { value: 1, label: "second" },
  ];

  let result = "";
  let remainingSeconds = seconds;

  units.forEach((unit) => {
    const value = Math.floor(remainingSeconds / unit.value);
    remainingSeconds %= unit.value;

    if (value > 0) {
      const unitLabel = value === 1 ? unit.label : `${unit.label}s`;
      result += `${value} ${unitLabel} `;
    }
  });

  return result.trim();
}
