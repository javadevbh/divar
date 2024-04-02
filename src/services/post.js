import api from "configs/api";
import axios from "axios";
import { getCookie } from "utils/cookie";

const createPost = async (form) => {
  const formData = new FormData();
  for (let i in form) {
    formData.append(i, form[i]);
  }

  const token = getCookie("accessToken");
  return axios
    .post(`${import.meta.env.VITE_BASE_URL}/post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((error) => error);
};

const getAllPosts = () => api.get("/");

export { createPost, getAllPosts };
