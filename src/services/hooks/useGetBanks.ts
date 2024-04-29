import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetBanks = (
  token?: string,
  startDate?: string,
  endDate?: string
) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    // Construye un objeto con solo los parámetros definidos
    const queryParams: Record<string, string | number> = {};

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

    const apiEndpoint = `/api/banks?${queryString}`;

    try {
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
  const { data, error, isLoading } = useSWR<any>("api/banks", getData);

  return {
    banks: data,
    isLoadingBanks: isLoading,
    isErrorBanks: error,
    revalidateBanks: () => mutate("api/banks"),
  };
};
