import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useDeleteCategory = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategory = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/categories/delete/${id}`
      );

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { deleteCategory, error, isLoading };
};

export default useDeleteCategory;
