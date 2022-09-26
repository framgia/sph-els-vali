import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetQuestions = (id, forceUpdate) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/questions/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
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
      getQuestions();
    }
  }, [user, forceUpdate]);

  return { error, isLoading, data };
};

export default useGetQuestions;
