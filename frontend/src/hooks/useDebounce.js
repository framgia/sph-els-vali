import { useEffect, useCallback, useState } from "react";

const useDebounce = () => {
  const [currentTimeout, setCurrentTimeout] = useState("");

  const debounce = (func, delay) => {
    clearTimeout(currentTimeout);
    const timeout = setTimeout(() => {
      func();
    }, delay);

    setCurrentTimeout(timeout);
  };

  return { debounce };
};

export default useDebounce;
