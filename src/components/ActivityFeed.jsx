import React from "react";

import Activity from "./Activity.jsx";

function ActivityFeed({ view, id, calls, handleIconInfoClick }) {
  return calls.map((call) => {
    return (
      <Activity
        key={call.id}
        call={call}
        onIconInfoClick={handleIconInfoClick}
      />
    );
  });
}

export default ActivityFeed;
