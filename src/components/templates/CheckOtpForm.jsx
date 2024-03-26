import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile as queryFn } from "services/user";
import { checkOtp } from "services/auth";
import { setCookie } from "utils/cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "helpers/toastify";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const input = useRef();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn,
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (code.length !== 5) return notify("error", "کد تایید باید 5 رقم باشد");

    const { response, error } = await checkOtp(mobile, code);
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) notify("error", "کد تایید اشتباه است یا زمان آن منقضی شده است");
  };

  return (
    <form
      onSubmit={submitHandler}
      className=" mt-24 mx-auto max-w-[500px] border border-gray-400 rounded-[5px] p-7 pb-0 grid gap-10"
    >
      <p className="text-xl">تایید کد پیامک شده</p>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <div className="grid gap-5">
        <span className="font-extralight text-sm text-slate-500">
          کد پیامک شده به شماره {mobile} را وارد کنید
        </span>
        <input
          type="text"
          id="input"
          placeholder="کد تایید پنج رقمی"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          ref={input}
          className="border border-gray-400 rounded-[5px] p-2 text-sm focus:border-primary-red"
        />
        <button
          onClick={() => setStep(1)}
          className="justify-self-end bg-slate-100 text-gray-400 font-extralight px-2  py-1 rounded-lg w-fit text-xs"
        >
          تغییر شماره موبایل
        </button>
      </div>
      <button type="submit" className="btn-red btn-md">
        ورود
      </button>
      <ToastContainer rtl={true} />
    </form>
  );
}

export default CheckOtpForm;
