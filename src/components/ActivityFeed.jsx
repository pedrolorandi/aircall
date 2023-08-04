import React from "react";

import Activity from "./Activity.jsx";
import IconView from "./IconView.jsx";

function ActivityFeed({
  view,
  calls,
  handleIconInfoClick,
  handleIconViewClick,
  handleArchiveAllClick,
  handleArchiveClick,
  showCheckbox,
  handleCheckboxSelection,
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
      <div className="container-links">
        <span className="link-archive" onClick={() => handleArchiveClick(view)}>
          {view === "Feed" ? "Archive" : "Unarchive"}
        </span>
        <span
          className="link-archive"
          onClick={() => handleArchiveAllClick(calls, view)}
        >
          {view === "Feed" ? "Archive all" : "Unarchive all"}
        </span>
      </div>
      {calls.map((call) => {
        if (view === "Feed" && !call.is_archived) {
          return (
            <Activity
              key={call.id}
              back={view}
              call={call}
              onIconInfoClick={handleIconInfoClick}
              showCheckbox={showCheckbox}
              onCheckboxSelect={handleCheckboxSelection}
            />
          );
        } else if (view === "Archived" && call.is_archived) {
          return (
            <Activity
              key={call.id}
              back={view}
              call={call}
              onIconInfoClick={handleIconInfoClick}
              showCheckbox={showCheckbox}
              onCheckboxSelect={handleCheckboxSelection}
            />
          );
        }
      })}
    </>
  );
}

export default ActivityFeed;
