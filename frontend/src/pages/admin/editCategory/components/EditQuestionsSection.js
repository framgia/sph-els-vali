import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import GrayedOutBtn from "pages/components/GrayedOutBtn";
import AddWordPopup from "./AddWordPopup";
import Question from "./Question";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

import useGetQuestions from "hooks/useGetQuestions";
import usePostQuestion from "hooks/usePostQuestion";
import { toastError } from "utils/toast";
import { QuestionSchema } from "validations/questionValidation";

const EditQuestionsSection = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [forceUpdate, setForceupdate] = useState(false);
  const { data } = useGetQuestions(id, forceUpdate);
  const { postQuestion } = usePostQuestion();

  const {
    getValues,
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(QuestionSchema),
    mode: "onChange",
  });

  const onSubmit = async ({
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    title,
    c_answer,
  }) => {
    const choiceArray = [choice_1, choice_2, choice_3, choice_4];

    await postQuestion(title, ...choiceArray, c_answer, id)
      .then(() => {
        setToggle(false);
        setForceupdate(!forceUpdate);
        reset();
      })
      .catch(() => {
        toastError("Something went wrong please try again later");
      });
  };

  return (
    <div className="flex flex-col w-[80%] space-y-1 bg-white p-10 h-fit rounded-md min-w-fit mb-10 mx-5">
      <div className="border-b p-2 flex justify-between">
        <h1 className="text-[1.8rem] font-medium">Questions</h1>
        <PlusIcon
          onClick={() => setToggle(true)}
          className="w-14 btn text-white px-4 cursor-pointer"
        />
      </div>

      {data?.questions
        .sort((a, b) => b.id - a.id)
        .map(({ id, title, choices, correct_answer }, i) => (
          <Question
            key={id}
            id={id}
            title={title}
            choices={choices}
            correct_answer={correct_answer}
            index={i + 1}
            setForceupdate={setForceupdate}
          />
        ))}

      {!data?.questions.length > 0 && (
        <p className="p-2 w-fit mx-auto text-[1.2rem] italic">
          No questions yet
        </p>
      )}

      {toggle && (
        <form
          onSubmit={
            Object.keys(dirtyFields).length > 0
              ? handleSubmit(onSubmit)
              : (e) => e.preventDefault()
          }
          className="fixed bg-black w-[100%] h-[100%] left-0 bottom-0 bg-opacity-20 z-10 flex justify-center items-center"
        >
          <div className="bg-white opacity-100 w-fit max-w-[80%] p-10 space-y-5  rounded-xl relative">
            <XMarkIcon
              onClick={() => setToggle(false)}
              className="w-8 absolute right-4 top-4 trans text-red-600 cursor-pointer active:scale-90"
            />
            <AddWordPopup
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
            <GrayedOutBtn type="submit" text="Add" array={dirtyFields} />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditQuestionsSection;
