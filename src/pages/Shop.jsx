import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortFilter, setSortFilter] = useState("latest");
  const location = useLocation();
  const param = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    if (param) {
      setCategoryFilter([...categoryFilter, param]);
    }
  }, [param]);

  async function getProducts() {
    let url = "products";

    if (param) {
      url += `?category=${param}`;
      if (categoryFilter.length > 0) {
        url += `?category=${param},${categoryFilter.join(",")}`;
      }
    } else if (categoryFilter.length > 0) {
      url += "?category=" + categoryFilter.join(",");
    }

    if (sortFilter) {
      url +=
        (param || categoryFilter.length > 0 ? "&" : "?") + "sort=" + sortFilter;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${url}`
      );
      setProducts(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, [categoryFilter, sortFilter]);

  const handleCategoryChange = (category) => {
    setCategoryFilter((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleSortChange = (sort) => {
    setSortFilter(sort);
  };

  return (
    <section className="mt-10 mb-20">
      <div className="container flex flex-col sm:flex-row gap-8">
        <div className="flex-2 accent-black ">
          <h2 className="font-bold">Product Categories</h2>
          <div className="flex flex-col gap-2 my-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="watches"
                name="watches"
                checked={categoryFilter.includes("watches")}
                onChange={() => handleCategoryChange("watches")}
              />
              <label htmlFor="watches">Watches</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="phones"
                name="phones"
                checked={categoryFilter.includes("phones")}
                onChange={() => handleCategoryChange("phones")}
              />
              <label htmlFor="phones">Phone</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="laptops"
                name="laptops"
                checked={categoryFilter.includes("laptops")}
                onChange={() => handleCategoryChange("laptops")}
              />
              <label htmlFor="laptops">Laptop</label>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2 my-4">
            <h2 className="font-bold">Sort by</h2>
            <div className="flex gap-2">
              <input
                type="radio"
                name="sort"
                id="latest"
                checked={sortFilter == "latest"}
                onChange={() => handleSortChange("latest")}
              />
              <label htmlFor="latest">Latest</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="sort"
                id="oldest"
                checked={sortFilter == "oldest"}
                onChange={() => handleSortChange("oldest")}
              />
              <label htmlFor="oldest">Oldest</label>
            </div>
          </div>
        </div>
        <div className="flex-1 mb-4">
          <h2 className="font-bold mb-4">
            Showing 1 - 9 of {products.length} Products
          </h2>
          {products.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <h2 className="text-center mt-10">0 products found.</h2>
          )}
        </div>
      </div>
    </section>
  );
}

export default Shop;
