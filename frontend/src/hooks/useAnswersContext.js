import { useContext } from "react";
import { AnswerContext } from "../contexts/AnswersContext";

export const useAnsersContext = () => {
  const context = useContext(AnswerContext);

  if (!context) {
    throw Error("Something went wrong");
  }

  return context;
};
