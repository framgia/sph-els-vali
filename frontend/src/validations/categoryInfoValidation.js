import * as yup from "yup";

export const CategoryInfoSchema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
});
