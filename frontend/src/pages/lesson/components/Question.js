import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Question = ({ currentItem }) => {
  const [answer, setAnswer] = useState("");
  const optionsLabel = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };

  return (
    <div className="flex my-10 mx-auto w-[50%] justify-between">
      <h1 className="text-[3rem]">{currentItem && currentItem[0].title}</h1>
      <div className="flex flex-col w-[50%] min-w-fit">
        {currentItem &&
          currentItem[0].choices.map((choice, i) => (
            <label
              key={i}
              htmlFor={`choice_${i}`}
              className={`cursor-pointer flex space-x-2 p-2 border-2 rounded-lg mb-5 items-center text-[1.2rem] ${
                answer === choice && "bg-green-500 text-white border-green-500"
              }`}
            >
              <input
                onChange={() => setAnswer(choice)}
                type="radio"
                name="choice"
                id={`choice_${i}`}
                className="hidden"
              />

              {answer === choice ? (
                <CheckIcon className="w-9 rounded-[100%] p-1 border text-green-700 bg-white" />
              ) : (
                <p className="border rounded-full p-1 px-3 bg-white">
                  {optionsLabel[i]}
                </p>
              )}

              <p className="">{choice}</p>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Question;
