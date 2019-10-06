const formatTime = time => {
  const seconds = time / 1000;
  const minutes = Math.floor(seconds / 60);
  const a = seconds - minutes * 60;
  return `${minutes ? `${minutes}:` : ""}${
    minutes && a < 10 ? "0" : ""
  }${a.toFixed(2).replace(".", ",")}`;
};

const Time = ({ time }) => {
  return formatTime(time);
};

export default Time;
