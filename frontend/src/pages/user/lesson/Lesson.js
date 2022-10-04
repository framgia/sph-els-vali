import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "pages/components/Navbar";
import HeaderSection from "./components/HeaderSection";
import Question from "./components/Question";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import useGetLesson from "hooks/useGetLesson";
import useLesson from "./hooks/useLesson";

const Lesson = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetLesson(id);
  const [answer, setAnswer] = useState("");

  const {
    currentIndex,
    currentItem,
    answersLoading,
    previousQueston,
    handleNext,
  } = useLesson(answer, setAnswer, data, id);

  const bntClass = `btn2 ${currentIndex > 0 ? "visible" : "invisible"}`;
  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1 justify-center">
        <div className="bg-white p-2 rounded-md shadow-md">
          {data && (
            <HeaderSection
              current={currentIndex + 1}
              all={data?.questions.length}
              title={data?.name}
            />
          )}

          {currentItem && (
            <Question
              key={currentItem?.id}
              currentItem={currentItem}
              answer={answer}
              setAnswer={setAnswer}
            />
          )}

          {isLoading || answersLoading ? (
            <ArrowPathIcon className="w-8 animate-spin mx-auto my-2" />
          ) : null}

          <footer className="flex justify-around select-none">
            <button onClick={() => previousQueston()} className={bntClass}>
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
