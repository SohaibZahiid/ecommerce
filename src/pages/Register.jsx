import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/image-1.svg";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import axios from "axios";
import { toast } from "sonner";

function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: registerData,
      validationSchema: registerSchema,
      onSubmit: async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/register`,
            values
          );
          if (res.data) {
            navigate("/login");
            toast.success("User registered successfully.");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    });

  return (
    <section className="flex h-screen">
      <div className="hidden xl:block flex-1">
        <img src={image} alt="image" className="h-full w-full object-cover" />
      </div>
      <div className="py-6 flex-1 flex justify-center items-center">
        <div className="max-w-[500px] w-[95%]">
          <Link
            to={"/"}
            className="rounded-xl my-4 w-max inline-block cursor-pointer"
          >
            <HiArrowLeft className="text-2xl" />
          </Link>
          <h2 className="font-bold text-2xl">Create Account</h2>
          <p className="text-gray-500">
            Please enter the details
            <br />
            This is where your customer signup and create a new account. To
            manage all users,{" "}
            <Link
              aria-label="admin"
              to={"/admin"}
              className="underline text-black"
            >
              login to the admin dashboard
            </Link>
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
              Register
            </button>
          </form>
          <p className="mt-4">
            Already have an account?{" "}
            <Link aria-label="login" to={"/login"} className="underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
