import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetCharts = (
  token: string,
  startDate: string,
  endDate: string
) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    try {
      const response = await axios.get(
        `/api/resume?dateStart=${startDate}&dateEnd=${endDate}`,
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
  const { data, error, isLoading } = useSWR<any>("charts/resume", getData);

  return {
    resume: data,
    isLoading,
    isError: error,
    revalidateTransactions: () => mutate("charts/resume"),
  };
};
