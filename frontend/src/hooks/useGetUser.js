import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetUser = (userId, dependencies) => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  let isCalled = false;

  const getUser = useCallback(
    async (userId) => {
      isCalled = true;
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/info/${userId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setData(res.data.user);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (err.response.statusText === "Unauthorized") {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        }
        setIsLoading(false);
        setError("Something went wrong, please try again later");
      }
    },
    [userId]
  );
  useEffect(() => {
    if (user && !isCalled) {
      getUser(userId);
    }
  }, [userId, dependencies]);

  return { error, isLoading, data };
};

export default useGetUser;
