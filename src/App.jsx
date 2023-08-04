import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

import axios from "axios";
import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";
import IconArchive from "./components/IconArchive.jsx";

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

  const handleIconInfoClick = (id) => {
    setState((prevState) => ({ ...prevState, view: "Detail", id: id }));
  };

  console.log(state);

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <h1>Feed</h1>
        <div className="container-archived">
          <IconArchive />
        </div>
        {state.view === "ActivityFeed" ? (
          <ActivityFeed
            view={state.view}
            id={state.id}
            calls={state.calls}
            handleIconInfoClick={handleIconInfoClick}
          />
        ) : (
          <ActivityDetail />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
