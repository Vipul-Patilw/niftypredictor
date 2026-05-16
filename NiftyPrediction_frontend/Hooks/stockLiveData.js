import { useState, useEffect } from "react";
import axios from "axios";

export default function stockLiveData(refreshInterval = 0.1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8000/live-data/");
      setData(response.data);
    } catch (error) {
      console.error("Axios error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, loading };
}
