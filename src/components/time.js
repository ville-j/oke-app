import React from "react";

const formatTime = time => {
  const seconds = time / 1000;
  const minutes = Math.floor(seconds / 60);
  const a = seconds - minutes * 60;
  const text = `${minutes ? `${minutes}:` : ""}${
    minutes && a < 10 ? "0" : ""
  }${a.toFixed(2).replace(".", ",")}`;
  if (time > 1000 * 60 * 60)
    return (
      <span role="img" aria-label="snail" title={text}>
        🐌
      </span>
    );
  return text;
};

const Time = ({ time }) => {
  return formatTime(time);
};

export default Time;
