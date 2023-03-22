import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export type HistoricProps = {
  date: string;
  description: string;
  category: HistoricCategory;
  id?: string;
};

export type HistoricCategory =
  | "school"
  | "work"
  | "trophee"
  | "graduate"
  | "certif"
  | "computer";

export const useGetHistorics = () => {
  return useQuery({
    queryKey: ["historics"],
    queryFn: async (): Promise<HistoricProps[]> => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "about/historic",
      });
      return response;
    },
    refetchOnWindowFocus: false,
  });
};
