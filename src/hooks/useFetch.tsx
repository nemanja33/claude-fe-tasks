import { useState, useEffect, useCallback } from 'react';

type FetchState = 'pending' | 'failed' | 'succeeded'

interface IUseFetch {
  queryFn: () => Promise<Response>,
}

const useFetch = <T,>({ queryFn }: IUseFetch) => {
  const [ apiData, setApiData ] = useState<T | null>(null)
  const [ fetchState, setFetchState ] = useState<FetchState>('pending')

  const getData = useCallback(async () => {
    try {
      setFetchState('pending');
      const response = await queryFn();
      if (!response.ok) {
        setFetchState('failed');
        return console.error(`HTTP error! status: ${response.status}`)
      }
      const data: T = await response.json();
      setApiData(data);
      setFetchState('succeeded');
    } catch (error) {
      if (error instanceof Error) {
        setFetchState('failed');
        return console.log('Fetch failed:', error.message);
      }
    }
  }, [queryFn]);

  useEffect(() => {
    getData();
  }, [getData])

  return {
    apiData,
    fetchState,
  }
};

export default useFetch;
export type { FetchState }