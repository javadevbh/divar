import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "services/admin";
import { getAllPosts } from "services/post";
import { filterProducts, getInitialQuery } from "helpers/helpers";
import { useScrollToTop } from "hooks/useScrollToTop";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";

function HomePage() {
  useScrollToTop();
  const [query, setQuery] = useState({});
  const [displayed, setDisplayed] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories, isPending: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
  });

  const {
    data: posts,
    isPending: postLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-all-posts"],
    queryFn: getAllPosts,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setDisplayed(posts?.data);
    setQuery(getInitialQuery(searchParams));
  }, [posts]);

  useEffect(() => {
    setSearchParams(query);
    const finalProducts = filterProducts(posts?.data, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      {categoryLoading || postLoading ? (
        <Loader />
      ) : (
        <div className="py-8 flex flex-col justify-between gap-6 md:flex-row">
          <Sidebar categories={categories} query={query} setQuery={setQuery} />
          <Main displayed={displayed} />
        </div>
      )}
    </>
  );
}

export default HomePage;
