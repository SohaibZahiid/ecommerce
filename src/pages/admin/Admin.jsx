import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import axios from "axios";

function Admin() {
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
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/login`,
            values
          );
          if (res.data.user) {
            navigate("/admin/dashboard");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
        // action.resetForm();
      },
    });

  return (
    <section className="flex items-center">
      <div className="py-6 flex-1 flex justify-center items-center">
        <div className="max-w-[500px] w-[95%]">
          <Link
            to={"/"}
            className="rounded-xl my-4 w-max inline-block cursor-pointer"
          >
            <HiArrowLeft className="text-2xl" />
          </Link>
          <h2 className="font-bold text-2xl">Welcome Admin</h2>
          <p className="text-gray-500">
            Please login here <br />
            For the admin, this is where administrators will log in to manage
            user accounts, review user activity, and perform administrative
            tasks for the entire system. To manage all users.{" "}
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
            <button type="submit" className="btn-primary self-start">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Admin;
