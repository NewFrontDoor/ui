import {useState, useEffect} from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = async () => {
    const response = await fetch(url);
    const status = await response.status;
    setData(await response.json());
    setLoading(false);
    if (status !== 200) {
      setError(status);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, loading, error];
}

export {useFetch};
