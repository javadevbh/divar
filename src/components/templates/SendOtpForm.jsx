import { useEffect, useRef } from "react";
import { sendOtp } from "services/auth";
import notify from "helpers/toastify";
import { p2e } from "utils/numbers";

function SendOtpForm({ setStep, mobile, setMobile }) {
  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (mobile.length !== 11)
      return notify("error", "شماره موبایل باید 11 رقم باشد!");

    const { response, error } = await sendOtp(p2e(mobile));
    if (response) setStep(2);
    if (error) notify("error", "مشکلی پیش آمده، لطفا بعدا تلاش کنید");
  };

  return (
    <form
      onSubmit={submitHandler}
      className=" mt-24 mx-auto max-w-[500px] border border-gray-400 rounded-[5px] p-7 pb-0 grid gap-10 mb-36"
    >
      <p className="text-xl">ورود به حساب کاربری</p>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <div className="grid gap-5">
        <span className="font-extralight text-sm text-slate-500">
          برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
          تایید به این شماره پیامک خواهد شد.
        </span>
        <input
          type="text"
          id="input"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          ref={input}
          className="input-gray input-md"
        />
      </div>
      <button type="submit" className="btn-red btn-md">
        ارسال کد تایید
      </button>
    </form>
  );
}

export default SendOtpForm;
