import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { editProductSchema, productSchema } from "../../schemas";
import { HiXMark } from "react-icons/hi2";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

function EditProductModal({ open, onClose, product }) {
  const { currentUser } = useContext(AuthContext);

  const [productData, setProductData] = useState({
    title: product?.title || "",
    desc: product?.desc || "",
    category: product?.category || "",
    price: product?.price || "",
    image: product?.image || "",
    featured: product?.featured || false,
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
    validationSchema: editProductSchema,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/products/${product._id}`,
          values,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-token": `Bearer ${currentUser.token}`,
            },
          }
        );
        if (res.data) {
          // find the index of product and update state instead of api call
          const updatedProductIndex = products.findIndex(
            (prod) => prod._id === res.data._id
          );
          const updatedProducts = [...products];
          updatedProducts[updatedProductIndex] = res.data;
          setProducts(updatedProducts);
          toast.success("Product updated successfully.");
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
        <h2 className="font-bold text-2xl">Update product</h2>
        <p className="text-gray-500">
          Please enter the details
          <br />
          This is where your administrator can update products
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
          <img
            src={product.image}
            alt="product image"
            className="w-32 h-32 object-contain"
          />
          <button type="submit" className="btn-primary self-start">
            Update
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

export default EditProductModal;
