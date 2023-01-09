import React from "react";
import useSWRMutation from "swr/mutation";

const useApiPost = <T>(route: string) => {
  const sendRequest = (url: string, { arg }: { arg: unknown }) =>
    fetch(url, { method: "POST", body: JSON.stringify(arg) }).then((res) =>
      res.json()
    );

  const { trigger, isMutating } = useSWRMutation<T>(route, sendRequest);

  return { trigger, isMutating };
};

export default useApiPost;
