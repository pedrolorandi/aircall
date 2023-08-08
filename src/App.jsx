// Import necessary libraries, components, hooks, and helper functions
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";

import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";
import Loading from "./components/Loading.jsx";
import archiveCalls from "./helpers/archiveCalls.js";
import useFetchCalls from "./hooks/useFetchCalls.js";

// Define the base URL for the API
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";

// Main App component
const App = () => {
  // Define the main state for the app
  const [state, setState] = useState({
    view: "Feed",
    back: null,
    id: null,
    call: null,
    calls: [],
  });

  // Define state variables for checkbox visibility and selected calls
  const [showCheckbox, setShowChecbox] = useState(false);
  const [archiveIds, setArchiveIds] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch calls using custom hook
  const fetchedCalls = useFetchCalls(
    `${BASE_URL}/activities`,
    fetchTrigger,
    setIsLoading
  );

  // Update main state with fetched calls
  useEffect(() => {
    setState((prevState) => ({ ...prevState, calls: fetchedCalls }));
  }, [fetchedCalls]);

  // Handle click on info icon
  const handleIconInfoClick = (back, id, call) => {
    setState((prevState) => ({ ...prevState, view: "Detail", back, id, call }));
  };

  // Handle click on view icon
  const handleIconViewClick = (view) => {
    setState((prevState) => ({ ...prevState, view, id: null }));
  };

  // Handle click on "Archive All" or "Unarchive All" link
  const handleArchiveAllClick = (calls, view) => {
    setIsLoading(true);

    const modifiedCalls = calls.filter((call) =>
      view === "Feed" ? !call.is_archived : call.is_archived
    );

    archiveCalls(
      `${BASE_URL}/activities`,
      modifiedCalls.map((call) => call.id),
      view === "Feed"
    )
      .then((response) => {
        setIsLoading(false);
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {
        setIsLoading(false);
        window.location.reload();
      });
  };

  // Handle click on "Archive" or "Unarchive" link
  const handleArchiveClick = (view) => {
    if (showCheckbox) {
      setIsLoading(true);

      archiveCalls(`${BASE_URL}/activities`, archiveIds, view === "Feed")
        .then((responses) => {
          setArchiveIds([]);
          setShowChecbox(!showCheckbox);
          setIsLoading(false);
          setFetchTrigger(fetchTrigger + 1);
        })
        .catch((error) => {
          setIsLoading(false);
          window.location.reload();
        });
    } else {
      setShowChecbox(!showCheckbox);
    }
  };

  // Handle selection of checkbox
  const handleCheckboxSelection = (id) => {
    if (!archiveIds.includes(id)) {
      setArchiveIds([...archiveIds, id]);
    } else {
      setArchiveIds(archiveIds.filter((arrayId) => arrayId !== id));
    }
  };

  // Render the app
  return (
    <div className="container">
      <Header />
      {isLoading && (
        <div className="is-loading">
          <Loading />
        </div>
      )}
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

// Render the app into the DOM
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
