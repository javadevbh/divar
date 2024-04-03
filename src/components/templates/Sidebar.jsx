import { MdOutlineCategory } from "react-icons/md";
import { createQueryObject } from "helpers/helpers";

function Sidebar({ categories, query, setQuery }) {
  const categoryHandler = (e) => {
    let category;
    const { tagName } = e.target;
    if (tagName !== "P") return;
    if (e.target.id === "all") category = "all";
    category = e.target.id;
    setQuery((query) => createQueryObject(query, { category }));
  };
  return (
    <div>
      <h4>دسته ها</h4>
      <ul onClick={categoryHandler} className="mt-4 grid gap-4">
        <li className="flex-balance space-x-reverse space-x-2 transition-all duration-200 text-slate-500 hover:text-black cursor-pointer text-sm">
          <MdOutlineCategory style={{ width: "25px", height: "25px" }} />
          <p id="all">همه</p>
        </li>
        {categories.data.map((category) => (
          <li
            key={category._id}
            className="flex-balance space-x-reverse space-x-2 transition-all duration-200 text-slate-500 hover:text-black cursor-pointer text-sm"
          >
            <img src={`${category.icon}.svg`} alt="icon" />
            <p
              id={category._id}
              className={`${
                query.category == category._id ? "active-category" : null
              }`}
            >
              {category.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
