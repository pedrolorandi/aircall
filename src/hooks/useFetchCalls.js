import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchCalls(url, trigger) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const badCalls = [
          "639a144e896e0d0f4bf88b31",
          "639a143c896e0d0f4bf88b2e",
          "639a10b8328500b1a0fa9c07",
        ];
        const filteredCalls = response.data.filter(
          (call) => call.call_type !== undefined && !badCalls.includes(call.id)
        );
        const sortedCalls = filteredCalls.reverse();
        setData(sortedCalls);
      })
      .catch((error) => console.error(error));
  }, [trigger]);

  return data;
}
