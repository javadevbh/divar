import { useQuery } from "@tanstack/react-query";
import { getPosts as queryFn } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/numbers";
import { shortenDescription } from "helpers/helpers";

function PostList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { data, isPending } = useQuery({ queryKey: ["my-post-list"], queryFn });

  return (
    <ul className="grid gap-4 mt-10">
      <h3 className="border-b-[3px] border-primary-red w-fit mb-2">
        آگهی های شما
      </h3>
      {isPending ? (
        <Loader />
      ) : (
        data.data.posts.map((post) => (
          <li
            key={post._id}
            className="flex-balance justify-between p-3 border-2 border-primary-gray rounded-md"
          >
            <div className="flex-balance space-x-reverse space-x-4">
              <img
                src={`${baseURL}/${post.images[0]}`}
                className="w-[100px] h-[70px] rounded-md"
              />
              <div>
                <p>{post.options.title}</p>
                <span className="text-xs text-gray-500">
                  {shortenDescription(post.options.content)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
              <span className="text-sm text-gray-500">
                {sp(post.amount)} تومان
              </span>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default PostList;
