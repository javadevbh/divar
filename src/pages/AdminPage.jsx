import { useScrollToTop } from "hooks/useScrollToTop";
import CategoryForm from "components/templates/CategoryForm";
import CategoryList from "components/templates/CategoryList";

function AdminPage() {
  useScrollToTop();
  return (
    <div>
      <CategoryList />
      <CategoryForm />
    </div>
  );
}

export default AdminPage;
