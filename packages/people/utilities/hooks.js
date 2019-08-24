import {useState, useEffect} from 'react';

function useFetch(apiUrl, apiParams) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchData = async () => {
    const params = apiParams ? Object.keys(apiParams)
      .map(key => key + '=' + apiParams[key])
<<<<<<< HEAD
      .join('&'): null;
    const url = apiUrl + "?" + params;
=======
      .join('&');
    const url = apiUrl + '?' + params;
>>>>>>> 74eec880f50f8f886c4c3cfc9e6ffb63ff61c3a5
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
  }, [fetchData]);

  return [data, loading, error];
}

export {useFetch};
