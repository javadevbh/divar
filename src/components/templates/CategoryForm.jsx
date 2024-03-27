import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addCategory as mutationFn } from "services/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "src/helpers/toastify";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isPending, data, isError } = useMutation({ mutationFn });

  useEffect(() => {
    if (data?.status === 201) {
      notify("success", "دسته بندی با موفقیت اضافه شد");
      setForm({ name: "", slug: "", icon: "" });
    }
  }, [data]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.name || !form.slug || !form.icon)
      return notify("warning", "لطفا همه فیلد هارا پر کنید");

    mutate(form);
  };

  if (isError) notify("error", "مشکلی پیش آمده، لطفا بعدا تلاش کنید");

  return (
    <form onSubmit={submitHandler} className="mt-10 mb-20 grid gap-2 max-w-72">
      <h3 className="border-b-[3px] border-primary-red w-fit mb-2">
        دسته بندی جدید
      </h3>
      <label htmlFor="name">اسم دسته بندی</label>
      <input
        type="text"
        name="name"
        id="name"
        value={form.name}
        onChange={changeHandler}
        className="input-gray input-md mb-3"
      />
      <label htmlFor="slug">اسلاگ</label>
      <input
        type="text"
        name="slug"
        id="slug"
        value={form.slug}
        onChange={changeHandler}
        className="input-gray input-md mb-3"
      />
      <label htmlFor="icon">آیکون</label>
      <input
        type="text"
        name="icon"
        id="icon"
        value={form.icon}
        onChange={changeHandler}
        className="input-gray input-md mb-3"
      />
      <button
        type="submit"
        disabled={isPending}
        className="btn-red btn-md mx-auto disabled:opacity-50"
      >
        ایجاد
      </button>
      <ToastContainer rtl={true} />
    </form>
  );
}

export default CategoryForm;
