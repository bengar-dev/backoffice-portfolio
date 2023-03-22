import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export type SkillsProps = {
  description: string;
  name: string;
  urlLogo: string;
  id?: string;
  display?: boolean;
  projectId?: string | null;
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async (): Promise<SkillsProps[]> => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "skills",
      });

      return response;
    },
    refetchOnWindowFocus: false,
  });
};
