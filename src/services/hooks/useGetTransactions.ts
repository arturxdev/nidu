import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetTransactions = (
  token?: string,
  limit?: number,
  page?: number,
  order?: string
) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    try {
      const response = await axios.get(
        `/api/transaction?limit=${limit}&page=${page}&order=${order}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos");
    }
  };

  //Conditional fetching
  const { data, error, isLoading } = useSWR<any>("api/transactions", getData);

  return {
    transactions: data,
    isLoading,
    isError: error,
    revalidateTransactions: () => mutate("api/transactions"),
  };
};
