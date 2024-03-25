import api from "configs/api";

const getProfile = () => {
  return api.get("/user/whoami");
};

export { getProfile };
