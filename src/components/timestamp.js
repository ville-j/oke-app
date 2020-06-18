import { formatDistanceStrict, fromUnixTime, format } from "date-fns";

const Timestamp = ({ time, relative, frmt }) => {
  return relative
    ? `${formatDistanceStrict(fromUnixTime(time + 1262304000), new Date())} ago`
    : `${format(fromUnixTime(time + 1262304000), frmt || "dd.MM.y HH:mm:ss")}`;
  //return `${formatDistance(fromUnixTime(time + 1262304000), new Date())} ago`;
};

export default Timestamp;
