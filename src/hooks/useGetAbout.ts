import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export type AboutProps = {
  content: string;
  urlPic: string;
};

export const useGetAbout = () => {
  const token = localStorage.getItem("token") || "";
  return useQuery({
    queryKey: ["about_info"],
    queryFn: async (): Promise<AboutProps> => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "about",
        token,
      });

      return response;
    },
  });
};
