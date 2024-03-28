import CategoryForm from "components/templates/CategoryForm";
import CategoryList from "components/templates/CategoryList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPage() {
  return (
    <div>
      <CategoryList />
      <CategoryForm />
      <ToastContainer rtl={true} />
    </div>
  );
}

export default AdminPage;
