import React from "react";

// Import components
import Activity from "./Activity.jsx";
import IconView from "./IconView.jsx";

// Define the ActivityFeed component
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
  // Filter calls based on the current view
  const filteredCalls = calls.filter(
    (call) =>
      (view === "Feed" && !call.is_archived) ||
      (view === "Archived" && call.is_archived)
  );

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
          <span>{view === "Feed" ? "Archived" : "Feed"}</span>{" "}
        </div>
      </div>
      <div className="container-links">
        <span className="link-archive" onClick={() => handleArchiveClick(view)}>
          {/* Display the archive/unarchive/done link based on the current view and checkbox state */}
          {showCheckbox ? "Done" : view === "Feed" ? "Archive" : "Unarchive"}
        </span>
        <span
          className="link-archive"
          onClick={() => handleArchiveAllClick(calls, view)}
        >
          {/* Display the archive all/unarchive all link based on the current view */}
          {view === "Feed" ? "Archive all" : "Unarchive all"}
        </span>
      </div>
      {/* Map over the filtered calls and display an Activity component for each call */}
      {filteredCalls.map((call) => (
        <Activity
          key={call.id}
          back={view}
          call={call}
          onIconInfoClick={handleIconInfoClick}
          showCheckbox={showCheckbox}
          onCheckboxSelect={handleCheckboxSelection}
        />
      ))}
    </>
  );
}

export default ActivityFeed;
