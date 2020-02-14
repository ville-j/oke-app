import { formatDistance, fromUnixTime, format } from "date-fns";

const Timestamp = ({ time, relative }) => {
  return relative
    ? `${formatDistance(fromUnixTime(time + 1262304000), new Date())} ago`
    : `${format(fromUnixTime(time + 1262304000), "dd.MM.y HH:mm:ss")}`;
  //return `${formatDistance(fromUnixTime(time + 1262304000), new Date())} ago`;
};

export default Timestamp;
