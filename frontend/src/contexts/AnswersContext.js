import { createContext, useReducer } from "react";
import { AnswersReducer } from "../reducers/answersReducer";

export const AnswerContext = createContext();

export const AnswerContextProvider = ({ children }) => {
  const [answers, dispatch] = useReducer(AnswersReducer, []);

  return (
    <AnswerContext.Provider value={{ answers, dispatch }}>
      {children}
    </AnswerContext.Provider>
  );
};
