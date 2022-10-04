import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const AddWordPopup = ({ register, errors, setValue }) => {
  const optionsLabel = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };

  const [answer, setAnswer] = useState(null);
  const [correct_answer, setCorrectAnswer] = useState("");

  useEffect(() => {
    setValue("c_answer", correct_answer);
  }, [correct_answer]);

  return (
    <div className="flex lg:flex-row sm:flex-col lg:space-x-2 sm:space-y-2 lg:space-y-0">
      <input
        type="text"
        className="text-[2rem] h-fit p-1 border flex min-w-[5rem] w-full"
        placeholder="Word"
        {...register("title")}
      />
      <p className="text-red-600">{errors.title && "Title is required."}</p>

      <div className="flex flex-col w-full">
        {Array(4)
          .fill(" ")
          ?.map((choice, i) => {
            return (
              <div key={i} className="mb-5">
                <label
                  htmlFor={`choice_${i}`}
                  className={`cursor-pointer w-full flex space-x-2 p-2 border-2 rounded-lg items-center text-[1.2rem] ${
                    answer?.choice === `choice_${i + 1}` && answer?.id === i
                      ? "bg-green-500 text-white border-green-500"
                      : null
                  }`}
                >
                  <input
                    type="radio"
                    name="choice"
                    onClick={() => {
                      setAnswer({ choice: `choice_${i + 1}`, id: i });
                      setCorrectAnswer(`choice_${i + 1}`);
                    }}
                    id={`choice_${i}`}
                    className="hidden"
                    {...register("c_answer")}
                  />

                  {answer?.choice === `choice_${i + 1}` && answer?.id === i ? (
                    <CheckIcon className="w-9 rounded-[100%] p-1 border text-green-700 bg-white" />
                  ) : (
                    <p className="border rounded-full p-1 px-3 bg-white">
                      {optionsLabel[i]}
                    </p>
                  )}

                  <input
                    className={`${
                      answer?.choice === `choice_${i + 1}` && answer?.id === i
                        ? "bg-green-500"
                        : null
                    } outline-none flex w-full`}
                    type="text"
                    placeholder="Answer choice"
                    onInput={(e) => {
                      if (answer?.id === i) {
                        setCorrectAnswer(e.target.value);
                      }
                    }}
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
  );
};

export default AddWordPopup;
