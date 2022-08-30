import axios from "axios";
import { useState } from "react";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (first_name, last_name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        first_name,
        last_name,
        email,
        password,
      });
      setIsLoading(false);
      setError(null);
    } catch (err) {
      if (err.response.data.error) {
        setIsLoading(false);
        setError(err.response.data.error);
      } else {
        setIsLoading(false);
        setError("Something went wrong, please try again later");
      }
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { signup, error, isLoading };
};

export default useSignup;
