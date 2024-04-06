import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts as queryFn } from "services/post";
import { useScrollToTop } from "hooks/useScrollToTop";
import Loader from "components/modules/Loader";
import PostDetailsSidebar from "components/templates/PostDetailsSidebar";

function PostDetailsPage() {
  useScrollToTop();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { data, isPending } = useQuery({
    queryKey: ["get-all-posts"],
    queryFn,
  });

  useEffect(() => {
    setPost(data?.data.posts.find((p) => p._id == id));
  }, [data]);

  if (isPending) return <Loader />;

  return (
    <div className="flex lg:flex-row flex-col-reverse gap-10 mt-24 mb-40 mx-auto w-fit">
      <PostDetailsSidebar post={post} />
      <div>
        <img
          src={`${baseURL}/${post?.images && post?.images[0]}`}
          alt="image"
          className="lg:w-[480px] lg:h-[360px] rounded-[3px]"
        />
      </div>
    </div>
  );
}

export default PostDetailsPage;
