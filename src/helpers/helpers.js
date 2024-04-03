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
  const filteredProducts = products.posts.filter((p) => p.category == category);
  return { posts: filteredProducts };
};

export {
  shortenDescription,
  createQueryObject,
  getInitialQuery,
  filterProducts,
};
