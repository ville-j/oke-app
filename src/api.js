import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const getBattles = async () => {
  const res = await axios.get("/battles");
  return res.data;
};

const getBattle = async id => {
  const res = await axios.get(`/battles/${id}`);
  return res.data;
};

const register = async (name, password) => {
  return await axios.post(`/users`, { name, password });
};

const login = async (name, password) => {
  try {
    const res = await axios.post(`/auth`, { name, password });
    setToken(res.data.token);
    return true;
  } catch (e) {
    return false;
  }
};

const auth = async () => {
  const res = await axios.get(`/me`);
  return res.data;
};

const setToken = token => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { getBattles, getBattle, register, login, auth };
