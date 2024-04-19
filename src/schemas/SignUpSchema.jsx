import * as yup from "yup";

export const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  mobile: yup
    .number()
    .typeError("Mobile must be a number")
    .min(10)
    .required("Mobile Number is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});
