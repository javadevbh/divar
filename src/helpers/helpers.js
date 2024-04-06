import moment from "moment-jalaali";

const shortenDescription = (desc) => {
  const partialText = desc.substring(0, 10);
  const finalText = partialText + "...";
  if (desc.length > 10) return finalText;
  return partialText;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }

  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  if (category) query.category = category;
  return query;
};

const filterProducts = (products, category) => {
  if (!category) return products;
  const filteredProducts = products?.posts.filter((p) => p.category == category);
  return { posts: filteredProducts };
};

const convertDateFormat = (dateString) => {
  const parts = dateString.split("/");
  const date = new Date(parts[2], parts[0] - 1, parts[1]);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const convertDate = (datePublished) => {
  const currentDate = moment();
  const enteredDate = moment(datePublished, "YYYY-MM-DD");
  const yearsDifference = currentDate.diff(enteredDate, "years");
  if (yearsDifference) return `${yearsDifference} سال پیش`;

  const monthsDifference = currentDate.diff(enteredDate, "months");
  if (monthsDifference) return `${monthsDifference} ماه پیش`;

  const daysDifference = currentDate.diff(enteredDate, "days");
  if (daysDifference == 0) return "امروز";
  return `${daysDifference} روز پیش`;
};

export {
  shortenDescription,
  createQueryObject,
  getInitialQuery,
  filterProducts,
  convertDate,
  convertDateFormat,
};
