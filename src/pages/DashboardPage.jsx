import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPostForm from "components/templates/AddPostForm";

function DashboardPage() {
  return (
    <div>
      <AddPostForm />
      <ToastContainer rtl={true} />
    </div>
  );
}

export default DashboardPage;
