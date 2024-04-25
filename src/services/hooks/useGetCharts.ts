import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

export const useGetCharts = (
  token: string,
  startDate: string,
  endDate: string
) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    // Construir la URL base
    let apiEndpoint = "/api/resume";

    // Agregar parámetros opcionales a la URL
    const queryParameters = [];
    if (startDate) {
      queryParameters.push(`dateStart=${startDate}`);
    }
    if (endDate) {
      queryParameters.push(`dateEnd=${endDate}`);
    }

    // Si hay parámetros, agrégalos a la URL base
    if (queryParameters.length > 0) {
      apiEndpoint += `?${queryParameters.join("&")}`;
    }

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
  const { data, error, isLoading } = useSWR<any>("charts/resume", getData);

  return {
    resume: data,
    isLoading,
    isError: error,
    revalidateResume: () => mutate("charts/resume"),
  };
};
