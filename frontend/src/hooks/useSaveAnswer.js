import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useSaveAnswer = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveAnswer = async (question_id, user_answer, quiz_id) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save_answer`, {
        question_id,
        user_answer,
        quiz_id,
      });

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { saveAnswer, error, isLoading };
};

export default useSaveAnswer;
