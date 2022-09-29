import { useEffect, useState } from "react";

const useSliceQuestions = (questions) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    if (currentIndex !== questions.length - 1) {
      setCurrentItem(questions.slice(currentIndex + 1, currentIndex + 2)[0]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousQueston = () => {
    if (currentIndex !== 0) {
      setCurrentItem(questions.slice(currentIndex - 1, currentIndex)[0]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const start = async () => {
      if (questions.length > 0) {
        await questions.map((question) => {
          return question.choices;
        });
        setCurrentItem(questions.slice(0, 1)[0]);
      }
    };

    start();
  }, [questions]);

  return { nextQuestion, previousQueston, currentItem, currentIndex };
};

export default useSliceQuestions;
