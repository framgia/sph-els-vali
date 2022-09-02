import axios from "axios";
import { useState } from "react";

const UseLogin = () => {
  const [error, setError] = useState(null);
  const [isResendFlag, setIsResendFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      const { id, token } = res.data;
      localStorage.setItem("user", JSON.stringify({ id, token }));
      setIsLoading(false);
      setIsResendFlag(true);
      setError(null);
    } catch (err) {
      if (err.response.data.error) {
        setIsResendFlag(err.response.data.resend_flag);
        setIsLoading(false);
        setError(err.response.data.error);
      } else {
        setIsLoading(false);
        setIsResendFlag(err.response.data.resend_flag);
        setError("Something went wrong, please try again later");
      }
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { login, error, isLoading, isResendFlag };
};

export default UseLogin;
