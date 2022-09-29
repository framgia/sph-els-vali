import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePostQuestion = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postQuestion = async (
    title,
    choice_1,
    choice_2,
    choice_3,
    choice_4,
    correct_answer,
    quiz_id
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/questions/add`,
        {
          title,
          choice_1,
          choice_2,
          choice_3,
          choice_4,
          correct_answer,
          quiz_id,
        }
      );
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { postQuestion, error, isLoading };
};

export default usePostQuestion;
