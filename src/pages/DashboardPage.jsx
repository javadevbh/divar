import { useScrollToTop } from "hooks/useScrollToTop";
import AddPostForm from "components/templates/AddPostForm";
import PostList from "components/templates/PostList";

function DashboardPage() {
  useScrollToTop();
  return (
    <div>
      <AddPostForm />
      <PostList />
    </div>
  );
}

export default DashboardPage;
