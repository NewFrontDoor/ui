import {useState, useEffect} from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    const status = await response.status;
    setData(json);
    setLoading(false);
    if (status !== 200) {
      setError(status);
    }
  }

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);
  return [data, loading, error];
}

export {useFetch};
