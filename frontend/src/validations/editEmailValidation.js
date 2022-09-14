import * as yup from "yup";

export const EditEmailSchema = yup.object().shape({
  email: yup.string().trim().email().required(),
  confirm_email: yup
    .string()
    .oneOf([yup.ref("email"), null])
    .required(),
});
