import { sendOtp } from "services/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "helpers/toastify";

function SendOtpForm({ setStep, mobile, setMobile }) {
  const submitHandler = async (e) => {
    e.preventDefault();

    if (mobile.length !== 11)
      return notify("error", "شماره موبایل باید 11 رقم باشد!");

    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) notify("error", "مشکلی پیش آمده، لطفا بعدا تلاش کنید");
  };

  return (
    <form onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال</button>
      <ToastContainer rtl={true} />
    </form>
  );
}

export default SendOtpForm;
