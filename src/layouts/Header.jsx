import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile as queryFn } from "services/user";
import { removeCookie } from "utils/cookie";

import { TbLogin } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

function Header() {
  const dropdown = useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn,
  });

  const logoutHandler = () => {
    removeCookie();
    refetch();
    navigate("/");
  };

  document.addEventListener("click", (e) => {
    if (!dropdown.current.contains(e.target)) {
      setIsOpen(false);
    }
  });

  return (
    <header className="w-full border-b-2 shadow-sm py-2 sticky top-0 bg-white">
      <nav className="px-content flex-balance justify-between">
        <div className="flex-balance space-x-reverse space-x-2">
          <Link to="/">
            <img className="w-12 h-12 ml-2" src="divar.svg" />
          </Link>
          <hr className="divider-y" />
          <span className="btn-gray btn-sm">
            <img src="location.svg" className="w-5" />
            <p>مشهد</p>
          </span>
        </div>
        <div className="flex-balance space-x-reverse space-x-4">
          <div
            ref={dropdown}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className="relative"
          >
            <span className="btn-gray btn-sm">
              <img src="profile.svg" className="w-4" />
              <p>دیوار من</p>
            </span>
            {isOpen && (
              <div className="absolute mt-2 w-56 rounded-md shadow-around bg-white p-2 flex flex-col gap-2">
                {data ? (
                  <div className="border-b border-primary-gray pb-2">
                    <div className="flex-balance space-x-reverse space-x-2 text-gray-500 p-1">
                      <CiUser />
                      <p className="text-sm font-extralight">کاربر دیوار</p>
                    </div>
                    <p className="text-xs font-extralight mr-6 mt-1 text-gray-400">
                      تلفن {data.data.mobile}
                    </p>
                  </div>
                ) : (
                  <Link to="/auth">
                    <div className="flex-balance space-x-reverse space-x-2 text-gray-500 hover:text-black hover:bg-primary-gray transition-all duration-300 cursor-pointer p-1 rounded-md">
                      <TbLogin />
                      <p className="text-sm font-extralight">ورود</p>
                    </div>
                  </Link>
                )}
                {data && data.data.role === "ADMIN" && (
                  <Link to="admin">
                    <div className="flex-balance space-x-reverse space-x-2 border-b border-primary-gray pb-2 text-gray-500 hover:text-black hover:bg-primary-gray transition-all duration-300 cursor-pointer p-1 rounded-md">
                      <RiAdminLine />
                      <p className="text-sm font-extralight">
                        ورود به پنل ادمین
                      </p>
                    </div>
                  </Link>
                )}
                {data && (
                  <div
                    onClick={logoutHandler}
                    className="flex-balance space-x-reverse space-x-2 text-gray-500 hover:text-black hover:bg-primary-gray transition-all duration-300 cursor-pointer p-1 rounded-md"
                  >
                    <TbLogout />
                    <p className="text-sm font-extralight">خروج</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link to="/dashboard">
            <button className="btn-red btn-sm">ثبت آگهی</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
