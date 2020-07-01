import axios from "axios";

const getAllCountries = async () => {
  const response = await axios.get("/api/user/countries");
  return response.data;
};
const getAllCities = async () => {
  const response = await axios.get("/api/user/cities");
  return response.data;
};
const getAllMessages = async () => {
  const response = await axios.get("/api/user/messages");
  return response.data;
};
const getAllBlogs = async () => {
  const response = await axios.get("/api/user/blogs");
  return response.data;
};
const getAllTags = async () => {
  const response = await axios.get("/api/user/tags");
  return response.data;
};
const getSingleBlog = async (title) => {
  const response = await axios.get(
    `/api/user/blogs/${encodeURIComponent(title.replace(/_/g, " "))}`
  );
  return response.data;
};
const addPerson = async (data) => {
  const response = await axios.post("/api/user", data);
  return response.data;
};
const getIP = async () => {
  const response = await axios.get("https://json.geoiplookup.io/");
  return response.data.ip;
};
const getSettings = async () => {
  const response = await axios.get("/api/user/settings");
  return response.data;
};
const getVipUsers = async (page, number) => {
  const response = await axios.get(`/api/user/vip/${page}/${number}`);
  return response.data;
};
const getNormalUsers = async (page, number) => {
  const response = await axios.get(`/api/user/normal/${page}/${number}`);
  return response.data;
};
const getSearchUsers = async (search, page, number) => {
  const { name, age, country, city } = search;
  let query = `?${name ? `name=${name}&` : ""}${age ? `age=${age}&` : ""}${
    country ? `country=${country}&` : ""
  }${city ? `city=${city}&` : ""}`;

  if (query.endsWith("&")) query = query.replace(/&$/, "");
  const response = await axios.get(
    `/api/user/search/${page}/${number}${query}`
  );
  return response.data;
};
const getAllUsersForFilter = async () => {
  const response = await axios.get("/api/user/filter/all");
  return response.data;
};

const getAds = async () => {
  const response = await axios.get("/api/user/ads");
  return response.data;
};

const addReport = async (data) => {
  const response = await axios.post("/api/user/report", data);
  return response.data;
};
const getSingleUser = async (username) => {
  const response = await axios.get(`/api/user/single/${username}`);
  return response.data;
};

export {
  getAllCities,
  getAllCountries,
  getAllBlogs,
  getAllTags,
  getSingleBlog,
  addPerson,
  getIP,
  getAllMessages,
  getSettings,
  getVipUsers,
  getNormalUsers,
  getSearchUsers,
  getAllUsersForFilter,
  getAds,
  addReport,
  getSingleUser,
};
