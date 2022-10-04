import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAnsersContext } from "hooks/useAnswersContext";
import useGetAnswer from "hooks/useGetAnswer";
import useSaveAnswer from "hooks/useSaveAnswer";
import useSliceQuestions from "hooks/useSliceQuestions";
import { toastError } from "utils/toast";

const useLesson = (answer, setAnswer, data, id) => {
  const { nextQuestion, previousQueston, currentItem, currentIndex } =
    useSliceQuestions(data?.questions ?? []);

  const { data: answerData, isLoading: answersLoading } = useGetAnswer(
    Number(id)
  );

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
          return toastError(
            "Could not save the answer, please try again later"
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
      dispatch({ type: "CLEAR ANSWERS" });
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

  return {
    currentIndex,
    currentItem,
    answersLoading,
    previousQueston,
    handleNext,
  };
};

export default useLesson;
