import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

import axios from "axios";
import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";

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

  useEffect(() => {
    axios
      .get(`${BASE_URL}/activities`)
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

        setState((prevState) => ({
          ...prevState,
          calls: sortedCalls,
        }));
      })
      .catch((error) => console.error(error));
  }, [fetchTrigger]);

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

    const requests = modifiedCalls.map((call) => {
      return axios.patch(`${BASE_URL}/activities/${call.id}`, {
        is_archived: view === "Feed" ? true : false,
      });
    });

    Promise.all(requests)
      .then((responses) => {
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => console.error(error));
  };

  const handleArchiveClick = (view) => {
    if (showCheckbox) {
      const requests = archiveIds.map((id) => {
        return axios.patch(`${BASE_URL}/activities/${id}`, {
          is_archived: view === "Feed" ? true : false,
        });
      });

      Promise.all(requests)
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
