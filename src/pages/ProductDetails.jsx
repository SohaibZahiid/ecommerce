import { useContext, useEffect, useState } from "react";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const id = useParams().id;
  const { addToCart } = useContext(CartContext);

  async function getProduct() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
      );
      setProduct(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function getRelatedProducts() {
    try {
      if (product.category) {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products?category=${
            product.category
          }&limit=4`
        );
        // Remove the correct product and set products
        setProducts(res.data.filter((product) => product._id != id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    getRelatedProducts();
  }, [product]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section>
      <div className="container my-10">
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-100 flex-1 h-[400px] flex justify-center items-center">
            <img
              src={product.image}
              alt="product"
              className="p-8 h-full object-contain"
            />
          </div>
          <div className="flex-1 py-6 md:px-6">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="my-2">
              {product.category} |{" "}
              <span className="text-green-500">In stock</span>
            </p>
            <p className="font-bold mb-6">${product.price}</p>
            <p className="font-bold">Description</p>
            <p>{product.desc}</p>
            <Button
              onClick={() => handleAddToCart(product)}
              className="inline-block btn-primary mt-4"
            >
              Add to cart
            </Button>
          </div>
        </div>

        {products.length > 0 && (
          <div className="my-20">
            <h2 className="text-3xl">Related Products</h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-6">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
