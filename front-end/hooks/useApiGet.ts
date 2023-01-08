import React from "react";
import useSWR from "swr";
import { FetcherArg } from ".";

const useApiGet = <T>(route: string) => {
  const fetcher = (...arg: FetcherArg) =>
    fetch(...arg).then((res) => res.json());
  const { data, error, isLoading } = useSWR<T>(() => route ?? null, fetcher);

  return {
    isLoading,
    error,
    data,
  };
};

export default useApiGet;
