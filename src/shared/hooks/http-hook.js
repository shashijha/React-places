import { useCallback, useEffect, useRef, useState } from "react";
import fetch from "cross-fetch";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const responsedata = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqHttp) => reqHttp !== httpAbortController
        );
        if (!response.ok) {
          throw new Error(responsedata.message);
        }
        setIsLoading(false);
        return responsedata;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };
  // This is used to cancel HttpRequest when page loads too fast
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
