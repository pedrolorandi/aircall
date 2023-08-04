import axios from "axios";

export default function archiveCalls(url, ids, isArchived) {
  const requests = ids.map((id) =>
    axios.patch(`${url}/${id}`, { is_archived: isArchived })
  );

  return Promise.all(requests);
}
