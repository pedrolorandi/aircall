import React from "react";
import IconUser from "./IconUser.jsx";

import getCallInfo from "../helpers/getCallInfo.js";
import formatDateToLongstring from "../helpers/formatDateToLongString.js";
import formatTime from "../helpers/formatTime.js";
import formatType from "../helpers/formatType.js";
import formatDuration from "../helpers/formatDuration.js";

function ActivityDetail({ back, call, handleBackLinkClick }) {
  console.log(call);

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
          {call.direction === "inbound" ? call.from || "Unknown" : call.to}
        </h1>
        <span className="info-type">
          {getCallInfo(call.call_type)} {call.via}
        </span>
      </div>
      <div className="container-call-info">
        <span className="call-info-date">
          {formatDateToLongstring(call.created_at)}
        </span>
        <div className="call-info-hour-type">
          <span className="call-info-hour">{formatTime(call.created_at)}</span>
          <span className="call-info-type">
            {formatType(call.call_type, call.direction)}
          </span>
          <span className="call-info-duration">
            {call.duration && formatDuration(call.duration)}
          </span>
        </div>
      </div>
    </>
  );
}

export default ActivityDetail;
