import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export const useGetStats = () => {
  const token = localStorage.getItem("token") || "";
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "stats",
        token,
      });
      return response;
    },
  });
};
