import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetAllUsers = (search, order, forceUpdate) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { user } = useAuthContext();

  const getAllUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users?search=${search}&orderBy=${order}`,
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
      getAllUsers();
    }
  }, [search, order, user, forceUpdate]);

  return { data, error, isLoading };
};

export default useGetAllUsers;
