import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePutEmail = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putEmail = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_email`, {
        email,
      });

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { putEmail, isLoading, error };
};

export default usePutEmail;
