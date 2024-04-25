import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetBanks = (token?: string) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    try {
      const response = await axios.get(`/api/banks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los datos");
    }
  };

  //Conditional fetching
  const { data, error, isLoading } = useSWR<any>("api/banks", getData);

  return {
    banks: data,
    isLoadingBanks: isLoading,
    isErrorBanks: error,
    revalidateTransactions: () => mutate("api/banks"),
  };
};
