import ky from 'ky-universal';
import {useState, useEffect} from 'react';

function useFetch(apiUrl, apiParams) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await ky(apiUrl, {
        searchParams: apiParams
      }).json();
      setData(result);
      setLoading(false);
    }

    fetchData().catch(error_ => {
      console.log(error_);
      setError(error_);
    });
  }, [apiParams, apiUrl]);

  return [data, loading, error];
}

export {useFetch};
