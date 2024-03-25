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
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn,
  });
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
    <form onSubmit={submitHandler}>
      <p>تایید کد پیامک شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
      <ToastContainer rtl={true} />
    </form>
  );
}

export default CheckOtpForm;
