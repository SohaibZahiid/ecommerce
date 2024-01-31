import { useFormik } from "formik";
import React, { useContext, useState } from "react";

import { registerSchema } from "../../schemas";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [updateData, setUpdateData] = useState({
    name: currentUser?.user?.name || "",
    email: currentUser?.user?.email || "",
    password: "",
    password2: "",
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: updateData,
      validationSchema: registerSchema,
      onSubmit: async () => {
        try {
          const res = await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/admin/${
              currentUser.user._id
            }`,
            values,
            {
              headers: {
                "auth-token": `Bearer ${currentUser.token}`,
              },
            }
          );

          if (res.data) {
            console.log(res.data);
            setCurrentUser(res.data);
            toast.success("Admin updated successfully.");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    });

  return (
    <div className="py-6 flex-1 flex justify-center items-center">
      <div className="max-w-[500px] w-[95%]">
        <h2 className="font-bold text-2xl">Update Account</h2>
        <p className="text-gray-500">
          Please enter the details
          <br />
          This is where your admin can update an account.
        </p>
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Full Name</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password2">Confirm Password</label>
            <input
              className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none"
              type="password"
              id="password2"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password2 && touched.password2 && (
              <span className="text-red-500 text-sm">{errors.password2}</span>
            )}
          </div>
          <button type="submit" className="btn-primary self-start">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
