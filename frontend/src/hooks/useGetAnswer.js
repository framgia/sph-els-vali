import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetAnswer = (question_id, quiz_id) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { user } = useAuthContext();

  const GetAnswer = async () => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/get_answer`,
        {
          params: {
            question_id,
            quiz_id,
          },
        }
      );
      setData(res.data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    if (user) {
      GetAnswer();
    }
  }, [question_id, quiz_id]);

  return { data, error, isLoading };
};

export default useGetAnswer;
