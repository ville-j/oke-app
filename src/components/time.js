import React from "react";

const MAX_VALUE = 0x7fffffff;
const MAX_APPLE = 256;
const MAX_TIME = MAX_VALUE - MAX_APPLE;

const formatTime = time => {
  if (time > MAX_TIME)
    return `${MAX_VALUE - time} apple${MAX_VALUE - time !== 1 ? `s` : ``}`;
  const seconds = time / 1000;
  const minutes = Math.floor(seconds / 60);
  const a = Math.floor((seconds - minutes * 60) * 100) / 100;
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
