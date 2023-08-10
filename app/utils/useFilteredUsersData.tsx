import { useEffect } from "react";
import useAuth from "./useAuth";
import useSWR from "swr";

const useFilteredUsersData = (filter: any) => {
  const { axiosJWT, token } = useAuth();
  const fetcher = (url: string) =>
    axiosJWT
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  let urlFilteredUsers = `${
    process.env.NEXT_PUBLIC_MY_BACKEND_URL
  }filteredUsers?start=${filter.start ? filter.start : 0}&limit=${
    filter.limit ? filter.limit : 6
  }`;
  let urlTotalFilteredUsers = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredUsers`;
  if (filter.searchQuery?.length > 0) {
    urlFilteredUsers += `&searchQuery=${filter?.searchQuery}`;
    urlTotalFilteredUsers += `?searchQuery=${filter?.searchQuery}`;
  }
  const { data: filteredUsers, mutate: mutateFilteredUsers } = useSWR(
    [
      "users",
      urlFilteredUsers,
      filter?.start,
      filter?.limit,
      filter?.searchQuery,
    ],
    () => fetcher(`${urlFilteredUsers}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );
  const { data: totalFilteredUsers, mutate: mutateTotalFilteredUsers } = useSWR(
    ["users", urlFilteredUsers, filter?.searchQuery],
    () => fetcher(`${urlFilteredUsers}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );

  useEffect(() => {
    mutateFilteredUsers();
    mutateTotalFilteredUsers();
  }, [
    filter?.start,
    filter?.limit,
    filter?.searchQuery,
    mutateFilteredUsers,
    mutateTotalFilteredUsers,
  ]);

  return { filteredUsers, totalFilteredUsers };
};

export default useFilteredUsersData;
