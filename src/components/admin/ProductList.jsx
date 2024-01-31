import { useContext, useEffect, useState } from "react";
import { HiOutlineTrash, HiMiniPencilSquare } from "react-icons/hi2";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "sonner";
import EditProductModal from "./EditProductModal";

function ProductList() {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { getProducts, products, setProducts, deleteProduct } =
    useContext(ProductContext);

  const getProductsData = async () => {
    try {
      await getProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.data) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="border-b font-medium">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start font-bold uppercase"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start font-bold uppercase"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start font-bold uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start font-bold uppercase"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start font-bold uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <div className="flex flex-col items-center">
                        <h2>{product.title}</h2>
                        <img
                          src={product.image}
                          alt="product image"
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product.desc.length > 20
                        ? `${product.desc.substring(0, 20)}...`
                        : product.desc}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      ${product.price}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex gap-2 text-xl">
                        <HiOutlineTrash
                          className="cursor-pointer"
                          onClick={() => handleDelete(product._id)}
                        />
                        <HiMiniPencilSquare
                          className="cursor-pointer"
                          onClick={() => {
                            setOpen(!open);
                            setEditProduct(product);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {open && (
              <EditProductModal
                open={open}
                onClose={() => setOpen(false)}
                product={editProduct}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
