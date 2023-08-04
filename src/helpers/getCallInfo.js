export default function getCallInfo(callType) {
  switch (callType) {
    case "answered":
      return "called via";
    case "missed":
    case "voicemail":
      return "tried to call via";
  }
}
