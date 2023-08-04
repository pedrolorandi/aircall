import React from "react";
import IconCall from "./IconCall.jsx";
import IconInfo from "./IconInfo.jsx";
import getCallInfo from "../helpers/getCallInfo.js";
import formatDate from "../helpers/formatDate.js";

function Activity({ call, onIconInfoClick }) {
  return (
    <div className="container-call">
      <IconCall direction={call.direction} callType={call.call_type} />
      <div className="call-info">
        <span
          className={`call-caller ${
            call.call_type === "missed" && "call-missed"
          }`}
        >
          {call.direction === "inbound" ? call.from || "Unknown" : call.to}
        </span>
        <span className="call-type">
          {getCallInfo(call.call_type)} {call.via}
        </span>
      </div>
      <div className="call-date">{formatDate(call.created_at)}</div>
      <IconInfo onIconInfoClick={onIconInfoClick} id={call.id} />
    </div>
  );
}

export default Activity;
