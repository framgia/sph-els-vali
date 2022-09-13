import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const UseGetFollowsCount = (userId) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getFollowsCount = async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/follows_count/${userId}`,
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
      getFollowsCount(userId);
    }
  }, [userId]);

  return { error, isLoading, data };
};

export default UseGetFollowsCount;
