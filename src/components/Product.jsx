import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 h-[300px] flex justify-center items-center py-10">
        <img
          src={product.image}
          alt="product"
          className="p-4 h-full object-contain"
        />
      </div>
      <Link
        aria-label={product.title + " " + product.desc + " " + product.price}
        to={`/product/${product._id}`}
      >
        <div className="desc cursor-pointer">
          <h2 className="font-bold">{product.title}</h2>
          <p>
            {product.desc.length > 50
              ? `${product.desc.substring(0, 50)}...`
              : product.desc}
          </p>
          <p className="font-bold">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
