import axios from "axios";

const login = async (email, password) => {
  const response = await axios.post("/api/admin/login", {
    email,
    password
  });
  return response.data;
};
const logged = async token => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.get("/api/admin/logged", config);
  return response.data;
};

const getAllCountries = async token => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.get("/api/admin/countries", config);
  return response.data;
};

const editManyCountries = async (token, names) => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.post(
    "/api/admin/countries/many",
    { names: names },
    config
  );
  return response.data;
};

const getAllCities = async token => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.get("/api/admin/cities", config);
  return response.data;
};

const addManyCities = async (token, cities) => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.post("/api/admin/cities/many", cities, config);
  return response.data;
};

const getAllUsers = async token => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.get("/api/admin/users", config);
  return response.data;
};
const addUser = async (token, userData) => {
  let config = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data"
    }
  };
  const response = await axios.post("/api/admin/users/", userData, config);
  return response.data;
};
const deleteUser = async (token, id) => {
  let config = {
    headers: {
      token: token
    }
  };
  const response = await axios.delete(`/api/admin/users/${id}`, config);
  return response.data;
};
const editUser = async (token, id, updatedUser) => {
  let config = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data"
    }
  };
  const response = await axios.put(
    `/api/admin/users/user/${id}`,
    updatedUser,
    config
  );
  return response.data;
};

const getAllMessages = async token => {
  const response = await axios.get("/api/admin/messages", {
    headers: { token }
  });
  return response.data;
};
const addMessage = async (token, messageData) => {
  const response = await axios.post("/api/admin/messages", messageData, {
    headers: { token }
  });
  return response.data;
};
const getAllBlogs = async token => {
  const response = await axios.get("/api/admin/blogs", {
    headers: { token }
  });
  return response.data;
};
const addBlog = async (token, blog) => {
  const response = await axios.post("/api/admin/blogs", blog, {
    headers: { token }
  });
  return response.data;
};
const editBlog = async (token, id, blog) => {
  const response = await axios.put(`/api/admin/blogs/${id}`, blog, {
    headers: { token }
  });
  return response.data;
};
const deleteBlog = async (token, id) => {
  const response = await axios.delete(`/api/admin/blogs/${id}`, {
    headers: { token }
  });
  return response.data;
};

const getAllTags = async token => {
  const response = await axios.get("/api/admin/tags", {
    headers: { token }
  });
  return response.data;
};
const editTags = async (token, tagsNames, link) => {
  const response = await axios.post(
    "/api/admin/tags",
    { tags: tagsNames, link },
    {
      headers: { token }
    }
  );
  return response.data;
};
const getSettings = async token => {
  const response = await axios.get("/api/admin/settings/", {
    headers: { token }
  });
  return response.data;
};
const changeSettings = async (token, id, data) => {
  const response = await axios.patch(
    "/api/admin/settings/",
    { id, data },
    {
      headers: { token }
    }
  );
  return response.data;
};

const convertVIP = async (token, list) => {
  const response = await axios.put("/api/admin/users/vip", list, {
    headers: { token }
  });
  return response.data;
};
const convertNormal = async (token, list) => {
  const response = await axios.put("/api/admin/users/normal", list, {
    headers: { token }
  });
  return response.data;
};
const block = async (token, list) => {
  const response = await axios.put("/api/admin/users/block", list, {
    headers: { token }
  });
  return response.data;
};
const unblock = async (token, list) => {
  const response = await axios.put("/api/admin/users/unblock", list, {
    headers: { token }
  });
  return response.data;
};
const deleteAll = async (token, list) => {
  const response = await axios.put("/api/admin/users/delete", list, {
    headers: { token }
  });
  return response.data;
};
const getReports = async token => {
  const response = await axios.get("/api/admin/reports", {
    headers: { token }
  });
  return response.data;
};

const doReports = async (token, list) => {
  const response = await axios.put("/api/admin/reports/done", list, {
    headers: { token }
  });
  return response.data;
};
const undoReports = async (token, list) => {
  const response = await axios.put("/api/admin/reports/undone", list, {
    headers: { token }
  });
  return response.data;
};
const deleteReports = async (token, list) => {
  const response = await axios.put("/api/admin/reports/delete", list, {
    headers: { token }
  });
  return response.data;
};

const getAds = async token => {
  const response = await axios.get("/api/admin/ads", { headers: { token } });
  return response.data;
};

const addAd = async (token, data) => {
  const response = await axios.post("/api/admin/ads/", data, {
    headers: { token }
  });
  return response.data;
};

const editAd = async (token, id, data) => {
  const response = await axios.put(`/api/admin/ads/${id}`, data, {
    headers: { token }
  });
  return response.data;
};
const deleteAd = async (token, id) => {
  const response = await axios.delete(`/api/admin/ads/${id}`, {
    headers: { token }
  });
  return response.data;
};

export {
  login,
  logged,
  getAllCountries,
  editManyCountries,
  getAllCities,
  addManyCities,
  getAllUsers,
  addUser,
  deleteUser,
  editUser,
  getAllMessages,
  addMessage,
  getAllBlogs,
  addBlog,
  editBlog,
  deleteBlog,
  getAllTags,
  editTags,
  getSettings,
  changeSettings,
  convertVIP,
  convertNormal,
  block,
  unblock,
  deleteAll,
  getReports,
  doReports,
  undoReports,
  deleteReports,
  getAds,
  addAd,
  editAd,
  deleteAd
};
