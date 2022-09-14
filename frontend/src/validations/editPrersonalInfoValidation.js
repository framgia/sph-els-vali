import * as yup from "yup";

export const EditPersonalInfoSchema = yup.object().shape({
  first_name: yup.string().trim().required(),
  last_name: yup.string().trim().required(),
});
