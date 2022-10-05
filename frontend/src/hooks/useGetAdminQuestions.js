import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetAdminQuestions = (id, forceUpdate) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getAdminQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/questions/${id}`,
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
      getAdminQuestions();
    }
  }, [user, forceUpdate]);

  return { error, isLoading, data };
};

export default useGetAdminQuestions;
