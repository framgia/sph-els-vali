import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePutPassword = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putPassword = async (old_password, new_password) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_password`, {
        old_password,
        new_password,
      });

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
      throw new Error(err.response.data.error);
    }
  };

  return { putPassword, isLoading, error };
};

export default usePutPassword;
