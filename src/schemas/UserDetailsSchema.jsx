import * as yup from "yup";

export const UserSchema = yup.object().shape({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  email: yup.string().email().required("Email is required."),
  mobile: yup
    .number()
    .typeError("Phone must be a number")
    .min(10)
    .required("Phone Number is required."),
  whatsapp: yup
    .number()
    .typeError("Whatsapp must be a number")
    .min(10)
    .required("Whatsapp Number is required."),
  city: yup.string().required("City is required."),
  age: yup.string().required("Age is required"),
  height: yup.string().required("Height is required").min(3).max(3),
  weight: yup.string().required("Weight is required").min(2).max(3),
  gender: yup.string().oneOf(["male", "female"]).required("Gender is required"),
});

export const CurrentDietSchema  = yup.object().shape({
  Morning:yup.string().required("morning diet is required."),
  Lunch:yup.string().required("lunch diet is required."),
  Dinner:yup.string().required("dinner diet is required.")
})