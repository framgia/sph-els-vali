export const AnswersReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR ANSWERS":
      return [];
    case "GET ANSWERS":
      return [...action.payroll];
    case "SAVE_ANSWER":
      const answers = state.filter(
        (answer) => answer.question_id === action.payroll.question_id
      );
      if (answers.length > 0) {
        state[state.indexOf(answers[0])] = {
          user_answer: action.payroll.user_answer,
          question_id: action.payroll.question_id,
          quiz_id: action.payroll.quiz_id,
        };
        return state;
      } else {
        return [
          ...state,
          {
            user_answer: action.payroll.user_answer,
            question_id: action.payroll.question_id,
            quiz_id: action.payroll.quiz_id,
          },
        ];
      }
  }
};
