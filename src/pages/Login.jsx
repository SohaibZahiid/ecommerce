import { Form, Link, useNavigate } from "react-router-dom";
import image from "../assets/images/image-1.svg";
import { useContext, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { Button } from "@/components/ui/button";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginData,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await login(values);
          if (res.data.token) {
            navigate("/");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
        // action.resetForm();
      },
    });

  return (
    <section className="flex h-screen px-5">
      <div className="hidden xl:block flex-1">
        <img src={image} alt="image" className="h-full w-full object-cover " />
      </div>
      <div className="py-6 flex-1 flex justify-center items-center">
        <div className="max-w-[500px] w-[95%]">
          <Link
            to={"/"}
            className="rounded-xl my-4 w-max inline-block cursor-pointer"
          >
            <HiArrowLeft className="text-2xl" />
          </Link>
          <h2 className="font-bold text-2xl">Welcome</h2>
          <p className="text-gray-500">
            Please login here <br />
            This is where your customer & admin will login to manage their
            account, review their history, and more.
          </p>
          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <input
                className="bg-gray-100 rounded py-2 px-4 mt-1 outline-none
                invalid:"
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
              )}{" "}
            </div>
            <Button type="submit" className="self-start">
              Login
            </Button>
          </form>
          <p className="mt-4">
            Already have an account?{" "}
            <Link aria-label="register" to={"/register"} className="underline">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
