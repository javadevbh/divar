import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories as queryFn } from "services/admin";
import { createPost as mutationFn } from "services/post";
import notify from "helpers/toastify";

function AddPostForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "66013b120efd683054c379b9",
    images: null,
  });
  const { data, isPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn,
  });

  const { mutate, data: mutateData } = useMutation({ mutationFn });

  useEffect(() => {
    if (!mutateData) return;
    if (mutateData.status === 200) {
      notify("success", "آگهی با موفقیت ثبت شد");
    } else {
      notify("error", "مشکلی پیش آمده لطفا بعدا تلاش کنید");
    }
  }, [mutateData]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: e.target.files[0] });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.content ||
      !form.amount ||
      !form.city ||
      !form.images
    )
      return notify("warning", "لطفا فیلد های خواسته شده را پر کنید");

    mutate(form, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["my-post-list"] }),
    });
  };
  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className="mt-10 mb-20 grid gap-2 max-w-72"
    >
      <h3 className="border-b-[3px] border-primary-red w-fit mb-2">
        افزودن آگهی
      </h3>
      <label htmlFor="title">
        عنوان<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="content">
        توضیحات<span className="text-red-500">*</span>
      </label>
      <textarea
        name="content"
        id="content"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="amount">
        قیمت<span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        name="amount"
        id="amount"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="city">
        شهر<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="city"
        id="city"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="category">دسته بندی</label>
      <select
        name="category"
        id="category"
        className="input-gray input-md mb-3"
      >
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">
        عکس<span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name="images"
        id="images"
        className="input-gray input-md mb-3"
      />
      <button
        type="submit"
        disabled={isPending}
        className="btn-red btn-md mx-auto disabled:opacity-50"
      >
        افزودن
      </button>
    </form>
  );
}

export default AddPostForm;
