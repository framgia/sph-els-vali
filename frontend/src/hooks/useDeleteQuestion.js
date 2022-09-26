import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useDeleteQuestion = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteQuestion = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/questions/delete/${id}`
      );

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { deleteQuestion, error, isLoading };
};

export default useDeleteQuestion;
