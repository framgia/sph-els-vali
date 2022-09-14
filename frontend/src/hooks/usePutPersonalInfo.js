import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const usePutPersonalInfo = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putPersonalInfo = async (first_name, last_name, image) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("avatar_url", image);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/edit_personal_info`,
        formData
      );
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong, please try again later");
      throw new Error("Something went wrong, please try again later");
    }
  };

  return { putPersonalInfo, error, isLoading };
};

export default usePutPersonalInfo;
