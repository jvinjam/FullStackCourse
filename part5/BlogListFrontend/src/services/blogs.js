import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newtoken) => {
  token = newtoken ? `Bearer ${newtoken}` : null;
};

const getToken = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return config;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getToken());
  return response.data;
};

const updateBlog = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getToken());
  return response ? response : null;
};

export default { setToken, getAll, createBlog, updateBlog, deleteBlog };
