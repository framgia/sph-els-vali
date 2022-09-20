import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const BodySection = ({ question, user_answer, correct_answer, correct }) => {
  const optionsLabel = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  return (
    <div className="my-10 border-b-2 border-dashed">
      <div
        className={`${
          user_answer === correct_answer ? "bg-green-200" : "bg-red-200"
        } flex w-[100%] justify-between p-2`}
      >
        <h1 className="text-[3rem]">{question && question.title}</h1>
        <div className="flex flex-col w-[50%] min-w-fit">
          {question &&
            question.choices.map((choice, i) => (
              <label
                key={i}
                htmlFor={`choice_${i}`}
                className={`cursor-pointer flex space-x-2 p-2 border-2 rounded-lg mb-5 items-center text-[1.2rem] ${
                  user_answer === choice
                    ? user_answer === correct_answer
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-red-500 text-white border-red-500"
                    : null
                } ${
                  correct_answer === choice && user_answer !== correct_answer
                    ? "bg-green-500 text-white border-green-500"
                    : null
                }`}
              >
                <input
                  type="radio"
                  name="choice"
                  id={`choice_${i}`}
                  className="hidden"
                />

                {user_answer === choice ? (
                  user_answer === correct_answer ? (
                    <CheckIcon className="w-9 rounded-[100%] p-1 border text-green-700 bg-white" />
                  ) : (
                    <XMarkIcon className="w-9 rounded-[100%] p-1 border text-red-700 bg-white" />
                  )
                ) : correct_answer == choice &&
                  user_answer !== correct_answer ? (
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
      <div className="p-2 text-[1.1rem]">
        {correct ? (
          <h1 className="text-green-600 text-[1.3rem] font-medium">Correct!</h1>
        ) : (
          <h1 className="text-red-600 text-[1.3rem] font-medium">Incorrect!</h1>
        )}
        <p>
          <span className="font-medium">Correct Answer:</span> {correct_answer}
        </p>
        <p>
          <span className="font-medium">Your Answer: </span>
          {user_answer ?? (
            <span className="text-red-600">
              You did not answer the question
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default BodySection;
