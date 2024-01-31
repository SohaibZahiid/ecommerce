import React from "react";
import Category from "./Category";

import watch from "../assets/images/categories/watches-category.png";
import phone from "../assets/images/categories/phones-category.png";
import laptop from "../assets/images/categories/laptops-category.png";

const categories = [
  {
    id: 1,
    title: "Watches",
    image: watch,
  },
  {
    id: 2,
    title: "Phones",
    image: phone,
  },
  {
    id: 3,
    title: "Laptops",
    image: laptop,
  },
];

function Categories() {
  return (
    <section className="my-20">
      <div className="container">
        <h2 className="text-3xl mb-10">Shop by Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
