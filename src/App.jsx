import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

import axios from "axios";
import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";

const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/activities";

const App = () => {
  const [state, setState] = useState({
    view: "Feed",
    back: null,
    id: null,
    call: null,
    calls: [],
  });

  useEffect(() => {
    axios
      .get(BASE_URL)
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

  const handleIconInfoClick = (back, id, call) => {
    setState((prevState) => ({ ...prevState, view: "Detail", back, id, call }));
  };

  const handleIconViewClick = (view) => {
    setState((prevState) => ({ ...prevState, view, id: null }));
  };

  const handleArchiveAllClick = (calls, view) => {
    const modifiedCalls = calls.filter((call) =>
      view === "Feed" ? !call.is_archived : call.is_archived
    );

    console.log(modifiedCalls);
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
            handleArchiveAllClick={handleArchiveAllClick}
          />
        ) : (
          <ActivityDetail
            back={state.back}
            id={state.id}
            call={state.call}
            handleBackLinkClick={handleIconViewClick}
          />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
