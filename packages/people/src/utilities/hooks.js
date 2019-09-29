import {useState, useEffect} from 'react';

function useFetch(apiUrl, apiParams) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const params = apiParams
        ? Object.keys(apiParams)
            .map(key => key + '=' + apiParams[key])
            .join('&')
        : null;
      const url = apiUrl + '?' + params;
      try {
        const response = await fetch(url);
        setData(await response.json());
        setLoading(false);
      } catch (error_) {
        setError(error_);
      }
    };

    fetchData();
  }, [apiParams, apiUrl]);

  return [data, loading, error];
}

export {useFetch};
