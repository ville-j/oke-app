import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const getBattles = async () => {
  const res = await axios.get("/battles");
  return res.data;
};

const getBattle = async id => {
  const res = await axios.get(`/battles/${id}`);
  return res.data;
};

export { getBattles, getBattle };
