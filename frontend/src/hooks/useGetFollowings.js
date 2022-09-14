import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetFollowings = (userId) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getFollowings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/following/${userId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setData(res.data.following);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    if (user) {
      getFollowings(userId);
    }
  }, [userId]);

  return { error, isLoading, data };
};

export default useGetFollowings;
