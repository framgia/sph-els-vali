import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFollowOrUnfolllow = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const followOrUnfollow = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/follows/${id}`);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };
  return { followOrUnfollow, error, isLoading };
};

export default useFollowOrUnfolllow;
