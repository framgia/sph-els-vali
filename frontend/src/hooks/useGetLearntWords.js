import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetLearntWords = (id) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getLearntWords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/learnt_words/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setData(res.data.result);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    if (user) {
      getLearntWords();
    }
  }, [user]);

  return { error, isLoading, data };
};

export default useGetLearntWords;
