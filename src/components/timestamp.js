import { formatDistance, fromUnixTime } from "date-fns";

const Timestamp = ({ time }) => {
  return `${formatDistance(fromUnixTime(time + 1262304000), new Date())} ago`;
};

export default Timestamp;
