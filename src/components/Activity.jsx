import React from "react";

// Import components and helper functions
import IconCall from "./IconCall.jsx";
import IconInfo from "./IconInfo.jsx";
import getCallInfo from "../helpers/getCallInfo.js";
import formatDate from "../helpers/formatDate.js";

function Activity({
  back,
  call,
  onIconInfoClick,
  showCheckbox,
  onCheckboxSelect,
}) {
  // Destructure the call object
  const { id, direction, call_type, from, to, via, created_at } = call;

  return (
    <div className="container-call">
      {/* If showCheckbox is true, display a checkbox */}
      {showCheckbox && (
        <input
          type="checkbox"
          name="callCheckbox"
          onChange={() => onCheckboxSelect(id)}
        />
      )}
      <IconCall direction={direction} callType={call_type} />
      <div className="call-info">
        {/* Display the caller's number, using the "from" number for inbound calls and the "to" number for outbound calls */}
        <span
          className={`call-caller ${call_type === "missed" && "call-missed"}`}
        >
          {direction === "inbound" ? from || "Unknown" : to}
        </span>
        <span className="call-type">
          {getCallInfo(call_type)} {via}
        </span>
      </div>
      <div className="call-date">{formatDate(created_at)}</div>
      <IconInfo
        onIconInfoClick={onIconInfoClick}
        back={back}
        id={id}
        call={call}
      />
    </div>
  );
}

export default Activity;
