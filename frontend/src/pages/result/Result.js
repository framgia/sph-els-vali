import { useParams } from "react-router-dom";
import useGetLesson from "../../hooks/useGetLesson";
import useGetResult from "../../hooks/useGetResult";
import Navbar from "../components/Navbar";
import HeaderSection from "../lesson/components/HeaderSection";
import BodySection from "./components/BodySection";

const Result = () => {
  const { id } = useParams();
  const { data } = useGetLesson(id);
  const { data: resultData } = useGetResult(id);

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1">
        <div className="bg-white p-2 rounded-md shadow-md">
          <HeaderSection
            current={resultData?.score}
            all={data?.questions.length}
            title={`Results for: ${data?.name}`}
          />

          {resultData && data
            ? resultData.result.map((result, i) => (
                <BodySection
                  key={result.question_id}
                  question={data.questions[i]}
                  user_answer={result.user_answer}
                  correct_answer={result.correct_answer}
                  correct={result.correct}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Result;
