import { CgDanger } from "react-icons/cg";
import { FaChevronLeft } from "react-icons/fa";
import { convertDate, convertDateFormat } from "src/helpers/helpers";

function PostDetailsSidebar({ post }) {
  const date = new Date(post?.createdAt).toLocaleDateString();
  return (
    <div className="lg:w-[380px] w-full flex flex-col gap-3">
      <div className="border-b border-primary-gray pb-4">
        <h2>{post?.options?.title}</h2>
        <p className="mt-2 font-extralight text-gray-500">
          {convertDate(convertDateFormat(date))} در {post?.options?.city}
        </p>
      </div>
      <div className="flex-balance justify-between border-b-2 border-primary-gray pb-2">
        <div className="flex-balance space-x-reverse space-x-3">
          <CgDanger style={{ width: "24px", height: "24px", color: "gray" }} />
          <p className="font-extralight">زنگ خطرهای قبل از معامله</p>
        </div>
        <FaChevronLeft
          style={{ width: "12px", height: "12px", color: "gray" }}
        />
      </div>
      <div className="flex-balance space-x-reverse space-x-3 mt-1 border-b-2 border-primary-gray">
        <button className="btn-red btn-md">اطلاعات تماس</button>
        <button className="btn-md btn-border">چت</button>
      </div>
      <div>
        <p>توضیحات</p>
        <p className="font-extralight mt-1">{post?.options?.content}</p>
      </div>
    </div>
  );
}

export default PostDetailsSidebar;
