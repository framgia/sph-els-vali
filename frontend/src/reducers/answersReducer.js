export const AnswersReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR ANSWERS":
      return [];
    case "GET ANSWERS":
      return [...action.payroll];
    case "SAVE_ANSWER":
      return [
        ...state,
        {
          user_answer: action.payroll.user_answer,
          question_id: action.payroll.question_id,
          quiz_id: action.payroll.quiz_id,
        },
      ];
  }
};
