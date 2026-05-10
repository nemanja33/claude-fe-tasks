
interface IUseFetch {
  queryFn: () => Promise<Response | null>,
}

const useFetch = <T,>({ queryFn }: IUseFetch) => {
  async function getData() {
    const response = await queryFn();
    if (!response?.ok) {
      return Promise.reject(new Error(`HTTP error! status: ${response?.status}`))
    }
    const data: T = await response.json();

    return data;
  };

  return getData
};

export default useFetch;