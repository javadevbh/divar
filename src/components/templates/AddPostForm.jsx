import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories as queryFn } from "services/admin";
import { createPost } from "services/post";
import notify from "helpers/toastify";

function AddPostForm() {
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
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    const { result } = await createPost(form);
    if (result.status === 200) {
      notify("success", result.data.message);
    } else {
      notify("error", "مشکلی پیش آمده لطفا بعدا تلاش کنید");
    }
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
      <label htmlFor="title">عنوان</label>
      <input
        type="text"
        name="title"
        id="title"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="content">توضیحات</label>
      <textarea
        name="content"
        id="content"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="amount">قیمت</label>
      <input
        type="number"
        name="amount"
        id="amount"
        className="input-gray input-md mb-3"
      />
      <label htmlFor="city">شهر</label>
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
      <label htmlFor="images">عکس</label>
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
