// Import necessary hooks and libraries
import { useEffect, useState } from "react";
import axios from "axios";

// Define a custom hook for fetching call data
export default function useFetchCalls(url, trigger) {
  // Initialize state for storing fetched data
  const [data, setData] = useState([]);

  // Use useEffect to fetch data whenever the 'trigger' changes
  useEffect(() => {
    // Make a GET request to the provided URL

    axios
      .get(url)
      .then((response) => {
        // Define IDs of calls to be excluded
        const badCalls = [
          "639a144e896e0d0f4bf88b31",
          "639a143c896e0d0f4bf88b2e",
          "639a10b8328500b1a0fa9c07",
        ];
        // Filter out calls with undefined call_type and calls in the badCalls list
        const filteredCalls = response.data.filter(
          (call) => call.call_type !== undefined && !badCalls.includes(call.id)
        );
        // Reverse the order of the calls
        const sortedCalls = filteredCalls.reverse();
        // Update the state with the sorted and filtered calls
        setData(sortedCalls);
      })
      .catch((error) => {
        window.location.reload();
      }); // Log any errors
  }, [trigger]); // Depend on 'trigger' to refetch data when it changes

  // Return the fetched data
  return data;
}
