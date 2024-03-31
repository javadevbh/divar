import AddPostForm from "components/templates/AddPostForm";
import PostList from "src/components/templates/PostList";

function DashboardPage() {
  return (
    <div>
      <AddPostForm />
      <PostList />
    </div>
  );
}

export default DashboardPage;
