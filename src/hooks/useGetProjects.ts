import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";
import { SkillsProps } from "./useGetSkills";

export type ProjectsProps = {
  name: string;
  preview: string;
  description: string;
  urlImage: string;
  pictures: string[];
  skillsId?: SkillsProps[];
  github?: string;
  live?: string;
  id?: string;
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ProjectsProps[]> => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "projects",
      });
      return response;
    },
    refetchOnWindowFocus: false,
  });
};
