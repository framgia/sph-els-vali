import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetCategories = (order, search, forceUpdate) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/categories?search=${search}&orderBy=${order}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setData(res.data.categories);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
    }
  });

  useEffect(() => {
    if (user) {
      getCategories();
    }
  }, [user, order, search, forceUpdate]);

  return { error, isLoading, data };
};

export default useGetCategories;
