import { sp } from "utils/numbers";

function Main({ posts }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <main className="flex flex-wrap justify-between w-full md:w-wCard gap-3">
      {posts.data.posts.map((post) => (
        <div
          key={post._id}
          className="flex justify-between p-4 rounded-md w-full md:w-[330px] border border-primary-gray"
        >
          <div className="flex flex-col justify-between">
            <p>{post.options.title}</p>
            <div className="grid gap-1 text-sm text-gray-500">
              <span>{sp(post.amount)} تومان</span>
              <span>{post.options.city}</span>
            </div>
          </div>
          <img
            src={`${baseURL}/${post.images[0]}`}
            className="w-[150px] h-[130px] rounded-[3px]"
          />
        </div>
      ))}
    </main>
  );
}

export default Main;
