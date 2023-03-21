import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export const useGetUserInfo = () => {
  const token = localStorage.getItem("token") || "";
  return useQuery({
    queryKey: ["user_info"],
    queryFn: async () => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "users/info",
        token,
      });
      return response;
    },
    onError: () => {
      if (token) {
        localStorage.removeItem("token");
      }
    },
    refetchOnWindowFocus: false,
  });
};
