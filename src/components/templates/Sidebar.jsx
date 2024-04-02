import { MdOutlineCategory } from "react-icons/md";

function Sidebar({ categories }) {
  return (
    <div>
      <h4>دسته ها</h4>
      <ul className="mt-4 grid gap-4">
        <li className="flex-balance space-x-reverse space-x-2 transition-all duration-200 text-slate-500 hover:text-black cursor-pointer text-sm">
          <MdOutlineCategory style={{ width: "25px", height: "25px" }} />
          <p>همه</p>
        </li>
        {categories.data.map((category) => (
          <li
            key={category._id}
            className="flex-balance space-x-reverse space-x-2 transition-all duration-200 text-slate-500 hover:text-black cursor-pointer text-sm"
          >
            <img src={`${category.icon}.svg`} alt="icon" />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
