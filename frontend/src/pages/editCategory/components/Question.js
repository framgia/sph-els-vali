import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDeleteQuestion from "../../../hooks/useDeleteQuestion";
import usePutQuestion from "../../../hooks/usePutQuestion";
import { toastError, toastSuccess } from "../../../utils/toast";
import { QuestionSchema } from "../../../validations/questionValidation";
import DeletePopup from "../../components/DeletePopup";
import GrayedOutBtn from "../../components/GrayedOutBtn";

const Question = ({
  id,
  title,
  choices,
  correct_answer,
  index,
  setForceupdate,
}) => {
  const optionsLabel = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  const [toggle, setToggle] = useState(false);
  const [answer, setAnswer] = useState(null);

  const { deleteQuestion } = useDeleteQuestion();
  const { putQuestion } = usePutQuestion();

  const {
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
    await putQuestion(id, title, ...choiceArray, c_answer)
      .then(() => {
        setForceupdate((forceUpdate) => !forceUpdate);
        reset({ keepTouched: false });
        toastSuccess("The questoin's successfully updated");
      })
      .catch(() => {
        toastError("Something went wrong please try again later");
      });
  };
  const handleDelete = async () => {
    await deleteQuestion(id)
      .then(() => {
        toastSuccess("The question's successfully deleted ");
        setForceupdate((forceUpdate) => !forceUpdate);
      })
      .catch(() => {
        toastError("Something's went wrong please try again later");
      });
  };

  useEffect(() => {
    setValue("title", title);
  }, [title]);

  useEffect(() => {
    setAnswer(correct_answer);
  }, [correct_answer]);

  return (
    <form
      key={id}
      onSubmit={
        Object.keys(dirtyFields).length > 0
          ? handleSubmit(onSubmit)
          : (e) => e.preventDefault()
      }
      className="p-2 border-b-2 border-dashed"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[1.2rem] font-medium">Question {index}</h1>
        <div className="flex p-2 space-x-2">
          <TrashIcon
            onClick={() => setToggle(true)}
            className="w-10 cursor-pointer trans p-2 rounded-md hover:text-red-700 active:scale-90"
          />
        </div>
      </div>
      <div className="flex lg:flex-row sm:flex-col lg:space-x-2 sm:space-y-2 lg:space-y-0">
        <input
          type="text"
          className="text-[2rem] h-fit p-1 border flex min-w-[5rem] w-full"
          {...register("title")}
        />
        <p className="text-red-600">{errors.title && "Title is required."}</p>

        <div className="flex flex-col w-full">
          {choices?.map((choice, i) => {
            if (
              !errors[`choice_${i + 1}`] &&
              !Object.keys(dirtyFields).length > 0
            ) {
              setValue(`choice_${i + 1}`, choice);
            }
            return (
              <div key={i} className="mb-5">
                <label
                  htmlFor={`choice_${i}_${id}`}
                  className={`cursor-pointer w-full flex space-x-2 p-2 border-2 rounded-lg items-center text-[1.2rem] ${
                    answer === `choice_${i + 1}`
                      ? "bg-green-500 text-white border-green-500"
                      : null
                  }`}
                >
                  <input
                    type="radio"
                    name="choice"
                    onClick={() => {
                      setAnswer(`choice_${i + 1}`);
                    }}
                    value={`choice_${i + 1}`}
                    id={`choice_${i}_${id}`}
                    className="hidden"
                    checked={correct_answer === `choice_${i + 1}`}
                    {...register("c_answer")}
                  />

                  {answer === `choice_${i + 1}` ? (
                    <CheckIcon className="w-9 rounded-[100%] p-1 border text-green-700 bg-white" />
                  ) : (
                    <p className="border rounded-full p-1 px-3 bg-white">
                      {optionsLabel[i]}
                    </p>
                  )}

                  <input
                    className={`${
                      answer === `choice_${i + 1}` ? "bg-green-500" : null
                    } outline-none flex w-full`}
                    type="text"
                    name={`choice_${i + 1}`}
                    {...register(`choice_${i + 1}`)}
                  />
                </label>
                <p className="text-red-600">
                  {errors[`choice_${i + 1}`] &&
                    "Choice should be unique and valid."}
                </p>
              </div>
            );
          })}
          <p className="text-red-600">
            {errors.c_answer && "Please select a choice."}
          </p>
        </div>
      </div>
      <GrayedOutBtn type="submit" text="Save" array={dirtyFields} />
      {toggle && (
        <DeletePopup
          name={`question ${index}`}
          setToggle={setToggle}
          handleDelete={handleDelete}
        />
      )}
    </form>
  );
};

export default Question;
