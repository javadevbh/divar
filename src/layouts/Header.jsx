import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full border-b-2 shadow-sm py-2">
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
          <Link to="/auth">
            <span className="btn-gray btn-sm">
              <img src="profile.svg" className="w-4" />
              <p>دیوار من</p>
            </span>
          </Link>
          <Link to="/dashboard">
            <button className="btn-red btn-sm">ثبت آگهی</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
