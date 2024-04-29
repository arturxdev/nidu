import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetTransactions = (
  token?: string,
  limit?: number,
  page?: number,
  order?: string,
  startDate?: string,
  endDate?: string
) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    try {
      // Construye un objeto con solo los parámetros definidos
      const queryParams: Record<string, string | number> = {};

      // Solo agrega valores no undefined
      if (limit !== undefined) {
        queryParams["limit"] = limit;
      }
      if (page !== undefined) {
        queryParams["page"] = page;
      }
      if (order !== undefined) {
        queryParams["order"] = order;
      }
      if (startDate !== undefined) {
        queryParams["dateStart"] = startDate;
      }
      if (endDate !== undefined) {
        queryParams["dateEnd"] = endDate;
      }

      // Convierte el objeto en una cadena de consulta
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .join("&");

      const apiEndpoint = `/api/transaction?${queryString}`;

      const response = await axios.get(apiEndpoint, {
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
  const { data, error, isLoading } = useSWR<any>("api/transactions", getData);

  return {
    transactions: data,
    isLoading,
    isError: error,
    revalidateTransactions: () => mutate("api/transactions"),
  };
};
