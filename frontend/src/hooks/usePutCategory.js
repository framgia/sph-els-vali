import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePutCategory = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putCategory = async (id, name, description) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/categories/edit/${id}`,
        {
          name,
          description,
        }
      );

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { putCategory, error, isLoading };
};

export default usePutCategory;
