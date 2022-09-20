import { useEffect, useState } from "react";

const useSliceQuestions = (questions) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const shuffleChoices = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

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
          shuffleChoices(question.choices);
        });
        setCurrentItem(questions.slice(0, 1)[0]);
      }
    };

    start();
  }, [questions]);

  return { nextQuestion, previousQueston, currentItem, currentIndex };
};

export default useSliceQuestions;
