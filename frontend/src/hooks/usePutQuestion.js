import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePutQuestion = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putQuestion = async (
    id,
    title,
    choice_1,
    choice_2,
    choice_3,
    correct_answer
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/questions/edit/${id}`,
        {
          title,
          choice_1,
          choice_2,
          choice_3,
          correct_answer,
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

  return { putQuestion, error, isLoading };
};

export default usePutQuestion;
