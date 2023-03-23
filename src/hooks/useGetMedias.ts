import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export type MediasProps = {
  CV: string;
  enableCV: boolean;
  github: string;
  id?: string;
  linkedin: string;
  twitch: string;
  twitter: string;
};

export const useGetMedias = () => {
  return useQuery({
    queryKey: ["medias"],
    queryFn: async (): Promise<MediasProps> => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "medias",
      });
      return response[0];
    },
  });
};
