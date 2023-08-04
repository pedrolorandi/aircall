import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

import axios from "axios";
import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";

const App = () => {
  const [state, setState] = useState({
    view: "Feed",
    back: null,
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

  const handleIconViewClick = (view) => {
    setState((prevState) => ({ ...prevState, view: view, id: null }));
  };

  console.log(state);

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {state.view === "Feed" || state.view === "Archived" ? (
          <ActivityFeed
            view={state.view}
            calls={state.calls}
            handleIconInfoClick={handleIconInfoClick}
            handleIconViewClick={handleIconViewClick}
          />
        ) : (
          <ActivityDetail back={state.back} id={state.id} />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
