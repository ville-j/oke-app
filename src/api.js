import axios from "axios";
axios.defaults.baseURL = "http://localhost:6543";

const getBattles = async () => {
  const res = await axios.get("/battles");
  return res.data;
};

const getResults = async id => {
  const res = await axios.get(`/battles/${id}`);
  return res.data;
};

export { getBattles, getResults };
