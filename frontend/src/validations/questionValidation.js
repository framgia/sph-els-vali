import * as yup from "yup";

export const QuestionSchema = yup.object().shape({
  title: yup.string().trim().required(),
  choice_1: yup
    .string()
    .trim()
    .required()
    .notOneOf([yup.ref("choice_2"), yup.ref("choice_3"), yup.ref("choice_4")]),
  choice_2: yup
    .string()
    .trim()
    .required()
    .notOneOf([yup.ref("choice_1"), yup.ref("choice_3"), yup.ref("choice_4")]),
  choice_3: yup
    .string()
    .trim()
    .required()
    .notOneOf([yup.ref("choice_2"), yup.ref("choice_1"), yup.ref("choice_4")]),
  choice_4: yup
    .string()
    .trim()
    .required()
    .notOneOf([yup.ref("choice_2"), yup.ref("choice_3"), yup.ref("choice_1")]),
  c_answer: yup.string().required(),
});
