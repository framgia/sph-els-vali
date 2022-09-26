import { PlusIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import useGetQuestions from "../../../hooks/useGetQuestions";
import Question from "./Question";

const EditQuestionsSection = () => {
  const { id } = useParams();
  const { data } = useGetQuestions(id);

  return (
    <div className="flex flex-col w-[80%] space-y-1 bg-white p-10 h-fit rounded-md min-w-fit mb-10 mx-5">
      <div className="border-b p-2 flex justify-between">
        <h1 className="text-[1.8rem] font-medium">Questions</h1>
        <PlusIcon className="w-14 btn text-white px-4 cursor-pointer" />
      </div>
      {data?.questions.map(({ id, title, choices, correct_answer }) => (
        <Question
          key={id}
          id={id}
          title={title}
          choices={choices}
          correct_answer={correct_answer}
        />
      ))}
    </div>
  );
};

export default EditQuestionsSection;
