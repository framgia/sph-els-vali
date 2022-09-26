import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePostCategory = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postCategory = async (name, description) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/categories/add`,
        {
          name,
          description,
        }
      );
      setIsLoading(false);
      setError(null);
      return res.data.id;
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { postCategory, error, isLoading };
};

export default usePostCategory;
