import { useState, useEffect, useCallback } from 'react';

type FetchState = 'loading' | 'error' | 'success'

interface IUseFetch {
  queryFn: () => Promise<Response>,
}

const useFetch = <T,>({ queryFn }: IUseFetch) => {
  const [ apiData, setApiData ] = useState<T | null>(null)
  const [ fetchState, setFetchState ] = useState<FetchState>('loading')

  const getData = useCallback(async () => {
    try {
      setFetchState('loading');
      const response = await queryFn();
      if (!response.ok) {
        setFetchState('error');
        return;
      }
      const data: T = await response.json();
      setApiData(data);
      setFetchState('success');
    } catch (error) {
      setFetchState('error');
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