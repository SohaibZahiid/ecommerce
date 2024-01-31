import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email.")
    .required("Email is required."),
  password: Yup.string().required("Please enter your password."),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Please enter valid name.")
    .required("Name is required."),
  email: Yup.string()
    .email("Please enter valid email.")
    .required("Emais is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 character")
    .required("Please enter your password."),
  password2: Yup.string()
    .required("Please enter your confirmation password.")
    .oneOf([Yup.ref("password"), null], "Password does not match."),
});

export const productSchema = Yup.object({
  title: Yup.string()
    .min(2, "Please enter valid title.")
    .required("Title is required."),
  desc: Yup.string()
    .min(10, "Description length should be more than 10 characters.")
    .required("Description is required."),
  category: Yup.string()
    .min(2, "Please enter valid category.")
    .required("Category is required."),
  price: Yup.number("Price must be a number.").required("Price is required."),
  image: Yup.mixed().test(
    "fileType",
    "File must be JPG, JPEG or PNG.",
    (val) => {
      if (val) {
        return (
          val.type === "image/jpeg" ||
          val.type === "image/jpg" ||
          val.type === "image/png"
        );
      } else {
        return true;
      }
    }
  ),
  featured: Yup.boolean(),
});

export const editProductSchema = Yup.object({
  title: Yup.string()
    .min(2, "Please enter valid title.")
    .required("Title is required."),
  desc: Yup.string()
    .min(10, "Description length should be more than 10 characters.")
    .required("Description is required."),
  category: Yup.string()
    .min(2, "Please enter valid category.")
    .required("Category is required."),
  price: Yup.number("Price must be a number.").required("Price is required."),
  image: Yup.mixed().test(
    "fileType",
    "File must be JPG, JPEG or PNG.",
    (val) => {
      if (!val) return true;
      if (typeof val === "string") return true;
      if (val) {
        return (
          val.type === "image/jpeg" ||
          val.type === "image/jpg" ||
          val.type === "image/png"
        );
      } else {
        return true;
      }
    }
  ),
  featured: Yup.boolean(),
});
