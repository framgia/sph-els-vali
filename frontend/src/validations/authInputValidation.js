import * as yup from "yup";

export const authInputSchema = yup.object().shape({
  first_name: yup.string().trim().required(),
  last_name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(5).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});
