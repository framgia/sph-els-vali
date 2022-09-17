import { useParams } from "react-router-dom";
import useGetLesson from "../../hooks/useGetLesson";
import useSliceQuestions from "../../hooks/useSliceQuestions";
import Navbar from "../components/Navbar";
import Question from "./components/Question";

const Lesson = () => {
  const { id } = useParams();
  const { data } = useGetLesson(id);

  const { nextQuestion, previousQueston, currentItem, currentIndex } =
    useSliceQuestions(data?.questions ?? []);

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1 justify-center">
        <div className="bg-white p-2 rounded-md shadow-md">
          <header className="flex justify-between text-[2rem] border-b-2 px-10 py-3">
            <h2 className="font-medium">{data?.name}</h2>
            <p>{`${currentIndex + 1}/${data?.questions.length}`}</p>
          </header>

          {currentItem && (
            <Question key={currentItem[0].id} currentItem={currentItem} />
          )}

          <footer className="flex justify-around select-none">
            <button
              onClick={() => previousQueston()}
              className={`btn2 ${currentIndex > 0 ? "visible" : "invisible"}`}
            >
              {"< Back"}
            </button>
            <button onClick={() => nextQuestion()} className="btn2">
              {currentIndex + 1 === data?.questions.length
                ? "Finish"
                : "Next >"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
