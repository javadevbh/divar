import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories as queryFn,
  deleteCategory as mutationFn,
} from "services/admin";
import notify from "helpers/toastify";
import Loader from "../modules/Loader";
import { useEffect } from "react";

function CategoryList() {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn,
  });

  const { mutate, data: mutateData } = useMutation({ mutationFn });

  useEffect(() => {
    if (!mutateData) return;
    if (mutateData.status === 200) {
      notify("success", "دسته بندی با موفقیت حذف شد");
    }
  }, [mutateData]);

  const deleteHandler = (id) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      },
    });
  };

  return (
    <ul className="grid gap-4 mt-10">
      <h3 className="border-b-[3px] border-primary-red w-fit mb-2">
        دسته بندی ها
      </h3>
      {isPending ? (
        <Loader height="500px" />
      ) : (
        data.data.map((i) => (
          <li
            key={i._id}
            className="flex-balance justify-between p-3 border-2 border-primary-gray rounded-md"
          >
            <div className="flex-balance space-x-reverse space-x-2">
              <img src={`${i.icon}.svg`} alt="icon" />
              <p>{i.name}</p>
            </div>
            <div className="flex-balance space-x-reverse space-x-4">
              <p className="text-primary-red">slug : {i.slug}</p>
              <button
                onClick={() => deleteHandler(i._id)}
                className="btn-red btn-xs"
              >
                حذف
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default CategoryList;
