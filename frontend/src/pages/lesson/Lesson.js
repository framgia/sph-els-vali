import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useGetAnswer from "../../hooks/useGetAnswer";
import useGetLesson from "../../hooks/useGetLesson";
import useSaveAnswer from "../../hooks/useSaveAnswer";
import useSliceQuestions from "../../hooks/useSliceQuestions";
import Navbar from "../components/Navbar";
import Question from "./components/Question";

const Lesson = () => {
  const { id } = useParams();
  const { data } = useGetLesson(id);

  const [answer, setAnswer] = useState("");

  const { nextQuestion, previousQueston, currentItem, currentIndex } =
    useSliceQuestions(data?.questions ?? []);

  const { data: answerData } = useGetAnswer(
    currentItem && currentItem[0].id,
    Number(id)
  );

  const { saveAnswer } = useSaveAnswer();

  const handleNext = async () => {
    if (answer && answer !== answerData?.user_answer) {
      await saveAnswer(currentItem[0].id, answer, Number(id))
        .then(() => {
          nextQuestion();
        })
        .catch(() => {
          return toast.error(
            "Could not save the answer, please try again later",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        });
    } else {
      nextQuestion();
    }
  };

  useEffect(() => {
    if (answerData && currentItem && answerData.quiz_id === Number(id)) {
      if (currentItem[0].id === answerData.question_id) {
        setAnswer(answerData.user_answer);
      } else {
        setAnswer("");
      }
    }
  }, [currentItem, answerData]);

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
            <Question
              key={currentItem[0].id}
              currentItem={currentItem}
              answer={answer}
              setAnswer={setAnswer}
            />
          )}

          <footer className="flex justify-around select-none">
            <button
              onClick={() => previousQueston()}
              className={`btn2 ${currentIndex > 0 ? "visible" : "invisible"}`}
            >
              {"< Back"}
            </button>
            <button onClick={handleNext} className="btn2">
              {currentIndex + 1 === data?.questions.length
                ? "Finish"
                : "Next >"}
            </button>
          </footer>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Lesson;
