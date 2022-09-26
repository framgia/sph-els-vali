import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetCategory = (id) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  let isCalled = false;

  const getCategory = async () => {
    isCalled = true;
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/category/${id}`,
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
    if (user && !isCalled) {
      getCategory();
    }
  }, [user]);

  return { error, isLoading, data };
};

export default useGetCategory;
