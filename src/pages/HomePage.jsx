import { useQuery } from "@tanstack/react-query";
import { getCategories } from "services/admin";
import { getAllPosts } from "services/post";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";

function HomePage() {
  const { data: categories, isPending: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
  });

  const { data: posts, isPending: postLoading } = useQuery({
    queryKey: ["get-all-posts"],
    queryFn: getAllPosts,
  });

  return (
    <>
      {categoryLoading || postLoading ? (
        <Loader />
      ) : (
        <div className="py-8 flex flex-col justify-between gap-6 md:flex-row">
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
