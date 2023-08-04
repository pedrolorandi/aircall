// Define a function to format duration in seconds into a human-readable format
export default function formatDuration(seconds) {
  // Define the units of time and their corresponding values in seconds
  const units = [
    { value: 86400, label: "day" },
    { value: 3600, label: "hour" },
    { value: 60, label: "minute" },
    { value: 1, label: "second" },
  ];

  // Initialize an empty string to store the result
  let result = "";
  // Initialize a variable to keep track of the remaining seconds
  let remainingSeconds = seconds;

  // Iterate over each unit of time
  units.forEach((unit) => {
    // Calculate how many of the current unit fit into the remaining seconds
    const value = Math.floor(remainingSeconds / unit.value);
    // Update the remaining seconds
    remainingSeconds %= unit.value;

    // If the value is greater than 0, add it to the result string
    if (value > 0) {
      // Determine the correct label for the unit (singular or plural)
      const unitLabel = value === 1 ? unit.label : `${unit.label}s`;
      // Add the value and unit label to the result string
      result += `${value} ${unitLabel} `;
    }
  });

  // Return the result string, removing any trailing whitespace
  return result.trim();
}
