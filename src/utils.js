const parseTime = (time) => {
  const h = Math.floor(time / (60000 * 60));
  const m = Math.floor((time / 60000) % 60);
  const s = (time % 60000) / 1000;

  return {
    h,
    m,
    s,
  };
};

const formatTime = ({ h, m, s }) => {
  return `${h ? `${h}h ` : ``}${m && m < 10 && h ? `0` : ``}${
    m ? `${m}m ` : ``
  }${s && m && s < 10 ? `0` : ``}${Math.floor(s)}s`;
};

const poll = (fn, interval) => () => {
  fn();
  const i = setInterval(() => {
    fn();
  }, interval);
  return () => {
    clearInterval(i);
  };
};

const alphaSort = (key) => (a, b) => a[key].localeCompare(b[key]);

const battleType = (type) => {
  switch (type) {
    case 0:
      return "normal";
    case 1:
      return "first finish";
    case 2:
      return "apple";
    default:
      return "unknown";
  }
};

export { parseTime, formatTime, poll, alphaSort, battleType };
