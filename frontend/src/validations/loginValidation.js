import * as yup from "yup";

export const loginInputSchema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(5).required(),
});
