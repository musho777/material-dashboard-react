import { useEffect, useState } from "react";

export const useFetch = ({ url, interval = null }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (url) {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
      if (interval) {
        const intervalId = setInterval(fetchData, interval);
        return () => clearInterval(intervalId);
      }
    }
  }, [url, interval]);

  return { loading, data, error };
};
