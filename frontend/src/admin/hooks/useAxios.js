import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 🔐 Pick whichever token exists (admin / evaluator / team)
      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("evaluatorToken") ||
        localStorage.getItem("teamToken");

      const response = await axios({
        url,
        method: options.method || "GET",
        data: options.data || options.body || null,
        params: options.params || null,
        headers: {
          ...(options.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
