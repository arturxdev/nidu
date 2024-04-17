import useSWR, { useSWRConfig } from "swr";
import { chartService } from "../charts";

export const useGetCharts = (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  const { mutate } = useSWRConfig();
  const getData = async () => {
    await chartService.resume(userId, startDate, endDate);
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
