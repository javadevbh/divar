import { toast } from "react-toastify";
const notify = (type, message) => {
  toast[type](message);
};

export default notify;
