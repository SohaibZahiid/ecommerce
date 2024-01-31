import { Link } from "react-router-dom";

function Category({ category }) {
  return (
    <div className="bg-gray-200 flex-1 min-w-[400px] h-[350px] rounded-md flex flex-col relative">
      <img
        src={category.image}
        alt="watch"
        className="w-full h-full object-cover"
      />
      <Link
        aria-label={category.title}
        to={`/shop?category=${category.title.toLowerCase()}`}
      >
        <div className="bg-white text-center cursor-pointer py-4 absolute bottom-4 left-4 right-4 rounded-md">
          {category.title}
        </div>
      </Link>
    </div>
  );
}

export default Category;
