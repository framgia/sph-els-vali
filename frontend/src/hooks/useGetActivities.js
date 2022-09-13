import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetActivities = (userId) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getActivities = useCallback(
    async (userId) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/activity/${userId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setData(res.data.activities);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setIsLoading(false);
        setError("Something went wrong, please try again later");
      }
    },
    [data, isLoading, error, userId]
  );

  useEffect(() => {
    if (user) {
      getActivities(userId);
    }
  }, [userId]);

  return { error, isLoading, data };
};

export default useGetActivities;
