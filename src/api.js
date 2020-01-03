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
  return await axios.post(`/kuskis`, { name, password });
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

const getTimes = async () => {
  const res = await axios.get(`/times`);
  return res.data;
};

const getLevelTimes = async id => {
  const res = await axios.get(`/times/${id}`);
  return res.data;
};

const getLevels = async page => {
  const res = await axios.get(`/levels`, {
    params: {
      page
    }
  });
  return res.data;
};

const getLevel = async id => {
  const res = await axios.get(`/levels/${id}`);
  return res.data;
};

const getKuski = async name => {
  const res = await axios.get(`/kuskis/${name}`);
  return res.data;
};

const getKuskis = async () => {
  const res = await axios.get(`/kuskis`);
  return res.data;
};

const getKuskiTimes = async id => {
  const res = await axios.get(`/times/kuski/${id}`);
  return res.data;
};

const logout = () => {
  setToken(null);
};

const setToken = token => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const search = async query => {
  const res = await axios.get(`/search`, {
    params: {
      query
    }
  });
  return res.data;
};

const uploadShirt = async (kuski, formData) => {
  const res = await axios.post(`/kuskis/${kuski}/shirt`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export {
  getBattles,
  getBattle,
  register,
  login,
  logout,
  auth,
  getTimes,
  getLevels,
  getLevel,
  getLevelTimes,
  search,
  getKuski,
  getKuskis,
  getKuskiTimes,
  uploadShirt
};
