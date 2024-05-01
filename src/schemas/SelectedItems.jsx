import * as yup from "yup";

export const validationSchema = yup.object().shape({
  acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});
