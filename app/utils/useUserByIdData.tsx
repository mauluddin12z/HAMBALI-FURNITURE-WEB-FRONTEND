import { useEffect } from "react";
import useSWR from "swr";
import useAuth from "./useAuth";
const useUserByIdData = (userId: number) => {
  const { axiosJWT, token } = useAuth();
  const fetcher = (url: string) =>
    axiosJWT
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

  let url: string = "";
  if (userId > 0) {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}user/${userId}`;
  }

  const { data: userById, mutate: mutateUserById } = useSWR("users", () =>
    fetcher(`${url}`)
  );

  useEffect(() => {
    mutateUserById();
  }, [mutateUserById]);

  return { userById };
};

export default useUserByIdData;
