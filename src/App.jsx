import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import axios from "axios";

import { getCallsGroupedByDate } from "./helpers/getCallsGroupedByDate.js";
import IconCall from "./components/IconCall.jsx";

const App = () => {
  const [state, setState] = useState({
    view: "ActivityFeed",
    calls: {},
  });

  useEffect(() => {
    axios
      .get("https://cerulean-marlin-wig.cyclic.app/activities")
      .then((response) => {
        const callsGroupedByDate = getCallsGroupedByDate(response.data);

        setState((prevState) => ({
          ...prevState,
          calls: callsGroupedByDate,
        }));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {Object.entries(state.calls)
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map((date) => {
            return (
              <div key={date[0]} className="container-date">
                <h2>{date[0]}</h2>
                {date[1].map((call) => {
                  return (
                    <div key={call.id} className="activity-detail">
                      <IconCall callType={call.direction} className="icon" />

                      {call.id}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
