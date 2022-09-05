import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetLearningsCount = (userId) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getLearningsCount = async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/learnings_count/${userId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setData(res.data.learntWordsAndLessons);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  };
  useEffect(() => {
    if (user) {
      getLearningsCount(userId);
    }
  }, [userId]);

  return { error, isLoading, data };
};

export default useGetLearningsCount;
