import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAnsersContext } from "../../hooks/useAnswersContext";
import useGetAnswer from "../../hooks/useGetAnswer";
import useGetLesson from "../../hooks/useGetLesson";
import useSaveAnswer from "../../hooks/useSaveAnswer";
import useSliceQuestions from "../../hooks/useSliceQuestions";
import Navbar from "../components/Navbar";
import HeaderSection from "./components/HeaderSection";
import Question from "./components/Question";

const Lesson = () => {
  const { id } = useParams();
  const { data } = useGetLesson(id);

  const [answer, setAnswer] = useState("");

  const { nextQuestion, previousQueston, currentItem, currentIndex } =
    useSliceQuestions(data?.questions ?? []);

  const { data: answerData } = useGetAnswer(Number(id));

  const { saveAnswer } = useSaveAnswer();

  const { answers, dispatch } = useAnsersContext();

  const getAnswer = (id) => {
    if (currentItem && id) {
      const answ = answers.filter((m) => m.question_id === id);
      return answ[0];
    }
  };

  const navigate = useNavigate();

  const handleNext = async () => {
    if (answer && answer !== getAnswer(currentItem?.id)?.user_answer) {
      await saveAnswer(currentItem?.id, answer, Number(id))
        .then(() => {
          if (currentIndex + 1 === data?.questions.length) {
            return navigate(`/result/${id}`);
          }
          dispatch({
            type: "SAVE_ANSWER",
            payroll: {
              user_answer: answer,
              question_id: currentItem?.id,
              quiz_id: Number(id),
            },
          });
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
      if (currentIndex + 1 === data?.questions.length) {
        return navigate(`/result/${id}`);
      }
      nextQuestion();
    }
  };

  useEffect(() => {
    if (answerData) {
      dispatch({ type: "GET ANSWERS", payroll: answerData.answers });
    }
  }, [answerData]);

  useEffect(() => {
    if (
      getAnswer(currentItem?.id)?.quiz_id === Number(id) &&
      currentItem?.id === getAnswer(currentItem?.id).question_id
    ) {
      setAnswer(getAnswer(currentItem?.id)?.user_answer);
    } else {
      setAnswer("");
    }
  }, [currentItem]);

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1 justify-center">
        <div className="bg-white p-2 rounded-md shadow-md">
          <HeaderSection
            current={currentIndex + 1}
            all={data?.questions.length}
            title={data?.name}
          />

          {currentItem && (
            <Question
              key={currentItem?.id}
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
