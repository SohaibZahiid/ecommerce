import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { productSchema } from "../../schemas";
import { HiXMark } from "react-icons/hi2";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

function ProductModal({ open, onClose }) {
  const { currentUser } = useContext(AuthContext);
  const [productData, setProductData] = useState({
    title: "",
    desc: "",
    category: "",
    price: "",
    image: "",
    featured: false,
  });

  const { setProducts, products } = useContext(ProductContext);

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: productData,
    validationSchema: productSchema,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/products`,
          values,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-token": `Bearer ${currentUser.token}`,
            },
          }
        );
        if (res.data) {
          setProducts([...products, res.data]);
          toast.success("Product added successfully.");
          onClose();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div
      onClick={() => {
        onClose();
        resetForm();
      }}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-[500px] w-[95%] bg-white rounded-md shadow p-5 md:p-10 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <h2 className="font-bold text-2xl">Create new product</h2>
        <p className="text-gray-500">
          Please enter the details
          <br />
          This is where your administrator can create new products
        </p>
        <form
          className="flex flex-col gap-4 mt-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="desc">Description</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="text"
              id="desc"
              name="desc"
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.desc && touched.desc && (
              <span className="text-red-500 text-sm">{errors.desc}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="category"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.category && touched.category && (
              <span className="text-red-500 text-sm">{errors.category}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="text"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price && (
              <span className="text-red-500 text-sm">{errors.price}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="image">Image</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="file"
              id="image"
              name="image"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
              onBlur={handleBlur}
            />
            {errors.image && touched.image && (
              <span className="text-red-500 text-sm">{errors.image}</span>
            )}
          </div>
          <button type="submit" className="btn-primary self-start">
            Create
          </button>
        </form>
        <HiXMark
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="text-xl absolute right-4 top-4 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ProductModal;
