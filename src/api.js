import axios from "axios";
axios.defaults.baseURL = "https://janka.la:2828";

const getBattles = async () => {
  const res = await axios.get("/battles");
  return res.data;
};

const getBattle = async id => {
  const res = await axios.get(`/battles/${id}`);
  return res.data;
};

export { getBattles, getBattle };
