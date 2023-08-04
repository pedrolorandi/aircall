export default function formatType(callType, direction) {
  switch (callType) {
    case "answered":
      return direction === "inbound" ? "Incoming Call" : "Outgoing Call";
    case "missed":
      return "Missed Call";
    case "voicemail":
      return "Voicemail";
  }
}
