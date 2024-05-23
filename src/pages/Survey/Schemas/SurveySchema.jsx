import * as yup from "yup";

export const schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
    mobile: yup
      .number()
      .typeError("Phone must be a number")
      .min(10)
      .required("Phone Number is required."),
      age: yup.string().required("Age is required"),
      height: yup.string().required("Height is required").min(3).max(3),
      weight: yup.string().required("Weight is required").min(2).max(3),
      gender: yup.string().oneOf(["male", "female"]).required("Gender is required"), 
});
