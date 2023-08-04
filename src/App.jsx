import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

import axios from "axios";
import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";
import archiveCalls from "./helpers/archiveCalls.js";

import useFetchCalls from "./hooks/useFetchCalls.js";

const BASE_URL = "https://cerulean-marlin-wig.cyclic.app";

const App = () => {
  const [state, setState] = useState({
    view: "Feed",
    back: null,
    id: null,
    call: null,
    calls: [],
  });

  const [showCheckbox, setShowChecbox] = useState(false);
  const [archiveIds, setArchiveIds] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const fetchedCalls = useFetchCalls(`${BASE_URL}/activities`, fetchTrigger);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, calls: fetchedCalls }));
  }, [fetchedCalls]);

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

    archiveCalls(
      `${BASE_URL}/activities`,
      modifiedCalls.map((call) => call.id),
      view === "Feed"
    )
      .then((response) => setFetchTrigger(fetchTrigger + 1))
      .catch((error) => console.error(error));
  };

  const handleArchiveClick = (view) => {
    if (showCheckbox) {
      archiveCalls(`${BASE_URL}/activities`, archiveIds, view === "Feed")
        .then((responses) => {
          setArchiveIds([]);
          setShowChecbox(!showCheckbox);
          setFetchTrigger(fetchTrigger + 1);
        })
        .catch((error) => console.error(error));
    } else {
      setShowChecbox(!showCheckbox);
    }
  };

  const handleCheckboxSelection = (id) => {
    let arrayIds = [...archiveIds];

    if (!arrayIds.includes(id)) {
      arrayIds.push(id);
    } else {
      const newArrayIds = arrayIds.filter((arrayId) => arrayId !== id);
      arrayIds = newArrayIds;
    }

    setArchiveIds(arrayIds);
  };

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
            handleArchiveClick={handleArchiveClick}
            showCheckbox={showCheckbox}
            handleCheckboxSelection={handleCheckboxSelection}
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
