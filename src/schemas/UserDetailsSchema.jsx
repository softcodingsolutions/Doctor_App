import * as yup from "yup";

export const UserSchema = yup.object().shape({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required."),
  mobile: yup
    .string()
    .required("Phone Number is required.")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  whatsapp: yup
    .string()
    .required("Whatsapp Number is required.")
    .matches(/^\d{10}$/, "WhatsApp number must be exactly 10 digits."),
  city: yup.string().required("City is required."),
  age: yup
    .string()
    .required("Age is required")
    .min(2, "Age must be at least 2 digits.")
    .max(2, "Age must be at most 2 digits."),
  height: yup
    .string()
    .required("Height is required")
    .min(3, "Height must be at least 3 digits.")
    .max(3, "Height must be at most 3 digits."),
  weight: yup
    .string()
    .required("Weight is required")
    .min(2, "Weight must be at least 2 digits.")
    .max(3, "Weight must be at most 3 digits."),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Select only one option")
    .required("Gender is required."),
});

export const CurrentDietSchema = yup.object().shape({
  Morning: yup.string().required("morning diet is required."),
  Lunch: yup.string().required("lunch diet is required."),
  Dinner: yup.string().required("dinner diet is required."),
});
