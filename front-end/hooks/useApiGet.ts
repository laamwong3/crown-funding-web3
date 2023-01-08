import React from "react";
import useSWR from "swr";

const useApiGet = <T>(route: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<T>(() => route ?? null, fetcher);

  return {
    isLoading,
    error,
    data,
  };
};

export default useApiGet;
