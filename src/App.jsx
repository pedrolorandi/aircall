import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Activity from "./components/Activity.jsx";

import axios from "axios";

const App = () => {
  const [state, setState] = useState({
    view: "ActivityFeed",
    id: null,
    calls: [],
  });

  useEffect(() => {
    axios
      .get("https://cerulean-marlin-wig.cyclic.app/activities")
      .then((response) => {
        const filteredCalls = response.data.filter(
          (call) => call.call_type !== undefined
        );
        const sortedCalls = filteredCalls.reverse();

        setState((prevState) => ({
          ...prevState,
          calls: sortedCalls,
        }));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleIconInfoClick = () => {
    console.log("Hi");
  };

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {state.calls.map((call) => {
          return (
            <Activity
              key={call.id}
              call={call}
              onIconInfoClick={handleIconInfoClick}
            />
          );
        })}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
