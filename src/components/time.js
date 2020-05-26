import { parseTime } from "../utils";

const MAX_VALUE = 0x7fffffff;
const MAX_APPLE = 256;
const MAX_TIME = MAX_VALUE - MAX_APPLE;

const format = (time) => {
  if (time > MAX_TIME)
    return `${MAX_VALUE - time} apple${MAX_VALUE - time !== 1 ? `s` : ``}`;

  let { h, m, s } = parseTime(time * 2);

  m += h * 60;
  s = Math.floor(s * 100) / 100;

  const text = `${m ? `${m}:` : ``}${m && s < 10 ? `0` : ``}${s
    .toFixed(2)
    .replace(`.`, `,`)}`;
  return text;
};

const Time = ({ time }) => {
  return format(time);
};

export default Time;
