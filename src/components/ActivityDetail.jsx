import React from "react";
// Import components and helper functions
import IconUser from "./IconUser.jsx";
import getCallInfo from "../helpers/getCallInfo.js";
import formatDateToLongstring from "../helpers/formatDateToLongString.js";
import formatTime from "../helpers/formatTime.js";
import formatType from "../helpers/formatType.js";
import formatDuration from "../helpers/formatDuration.js";

function ActivityDetail({ back, call, handleBackLinkClick }) {
  // Destructure the call object
  const { direction, from, to, call_type, via, created_at, duration } = call;

  return (
    <>
      <div className="container-menu">
        <span
          className="backlink"
          onClick={() => handleBackLinkClick(back)}
        >{`< ${back}`}</span>
      </div>
      <div className="container-user">
        <IconUser />
        <h1 className="info-number">
          {direction === "inbound" ? from || "Unknown" : to}
        </h1>
        <span className="info-type">
          {getCallInfo(call_type)} {via}
        </span>
      </div>
      <div className="container-call-info">
        <span className="call-info-date">
          {formatDateToLongstring(created_at)}
        </span>
        <div className="call-info-hour-type">
          <span className="call-info-hour">{formatTime(created_at)}</span>
          <span className="call-info-type">
            {formatType(call_type, direction)}
          </span>
          <span className="call-info-duration">
            {duration && formatDuration(duration)}
          </span>
        </div>
      </div>
    </>
  );
}

export default ActivityDetail;
