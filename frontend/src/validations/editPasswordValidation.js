import * as yup from "yup";

export const EditPasswordSchema = yup.object().shape({
  old_password: yup.string().trim().min(5).required(),
  new_password: yup
    .string()
    .trim()
    .min(5)
    .notOneOf([yup.ref("old_password"), null])
    .required(),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null])
    .required(),
});
