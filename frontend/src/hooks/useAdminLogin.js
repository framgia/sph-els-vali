import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useAdminLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
        {
          email,
          password,
        }
      );
      const { id, token } = res.data;
      localStorage.setItem("user", JSON.stringify({ id, token }));
      dispatch({ type: "LOGIN", payload: { id, token } });
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.error);
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { login, error, isLoading };
};

export default useAdminLogin;
