export function getCallsGroupedByDate(calls) {
  const callsGroupedByDate = calls.reduce((datesObj, call) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(call.created_at);
    const formattedDate = date.toLocaleDateString("en-US", options);

    if (call.direction) {
      datesObj[formattedDate]
        ? datesObj[formattedDate].push(call)
        : (datesObj[formattedDate] = [call]);
    }

    return datesObj;
  }, {});

  return callsGroupedByDate;
}
