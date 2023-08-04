import React from "react";

import Activity from "./Activity.jsx";
import IconView from "./IconView.jsx";

function ActivityFeed({
  view,
  calls,
  handleIconInfoClick,
  handleIconViewClick,
}) {
  return (
    <>
      <div className="container-menu">
        <h1>{view}</h1>
        <div
          className="container-button"
          onClick={() =>
            handleIconViewClick(view === "Feed" ? "Archived" : "Feed")
          }
        >
          <IconView view={view} />
          <span>{view === "Feed" ? "Archived" : "Feed"}</span>
        </div>
      </div>
      {calls.map((call) => {
        return (
          <Activity
            key={call.id}
            call={call}
            onIconInfoClick={handleIconInfoClick}
          />
        );
      })}
    </>
  );
}

export default ActivityFeed;
