import axios from "axios";
import socket from "./socket";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const getBattles = async (date) => {
  const res = await axios.get(`/battles?t=${date}`);
  return res.data;
};

const getBattle = async (id) => {
  const res = await axios.get(`/battles/${id}`);
  return res.data;
};

const register = async (name, password, country) => {
  return await axios.post(`/kuskis`, { name, password, country });
};

const login = async (name, password) => {
  try {
    const res = await axios.post(`/auth`, { name, password });
    setToken(res.data.token);
    socket.auth(res.data.token);

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

const getLevelTimes = async (id) => {
  const res = await axios.get(`/times/${id}`);
  return res.data;
};

const getLevels = async (page) => {
  const res = await axios.get(`/levels`, {
    params: {
      page,
    },
  });
  return res.data;
};

const getLevel = async (id) => {
  const res = await axios.get(`/levels/${id}`);
  return res.data;
};

const getLevelPacks = async (id) => {
  const res = await axios.get(`/levelpacks`, { params: { id } });
  return res.data;
};

const getLevelPack = async (name) => {
  const res = await axios.get(`/levelpacks/${name}`);
  return res.data;
};

const getKuski = async (name) => {
  const res = await axios.get(`/kuskis/${name}`);
  return res.data;
};

const getKuskis = async () => {
  const res = await axios.get(`/kuskis`);
  return res.data;
};

const getKuskiTimes = async (id) => {
  const res = await axios.get(`/times/kuski/${id}`);
  return res.data;
};

const logout = () => {
  setToken(null);
  socket.auth(null);
};

const setToken = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const search = async (query, types) => {
  const res = await axios.get(`/search`, {
    params: {
      query,
      types,
    },
  });
  return res.data;
};

const uploadShirt = async (kuski, formData) => {
  const res = await axios.post(`/kuskis/${kuski}/shirt`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const updateSettings = async (data) => {
  const res = await axios.patch(`/settings`, data);
  return res.data;
};

const joinTeam = async (team, password) => {
  const res = await axios.post(`/teams`, { team, password });
  return res.data;
};

const createLevelPack = async (shortName, longName, description) => {
  return await axios.post(`/levelpacks`, {
    name_short: shortName,
    name_long: longName,
    descrip: description,
  });
};

const editLevelPack = async (id, shortName, longName, description) => {
  return await axios.put(`/levelpacks`, {
    id,
    name_short: shortName,
    name_long: longName,
    descrip: description,
  });
};

const addLevelPackLevel = async (id, levId) => {
  return await axios.post(`/levelpacks/${id}`, {
    levId,
  });
};

const removeLevelPackLevel = async (id, levId) => {
  return await axios.delete(`/levelpacks`, {
    data: {
      id,
      levId,
    },
  });
};

const deleteLevelPack = async (id) => {
  return await axios.delete(`/levelpacks/${id}`);
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
  uploadShirt,
  updateSettings,
  joinTeam,
  getLevelPacks,
  getLevelPack,
  createLevelPack,
  editLevelPack,
  removeLevelPackLevel,
  addLevelPackLevel,
  deleteLevelPack,
};
