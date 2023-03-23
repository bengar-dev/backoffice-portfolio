import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState, updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";
import { ProjectsProps } from "./useGetProjects";

export const useEditProject = () => {
  const toaster = useSetRecoilState(updateToaster);
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProjectsProps) => {
      const { data: response } = await axiosRequest({
        method: "put",
        target: `projects/${data.id}`,
        data,
        token,
      });
      return response;
    },
    onSuccess: async () => {
      modal(false);
      toaster({
        display: true,
        type: "success",
        value: "Project has been edited",
      });
      await queryClient.refetchQueries({ queryKey: ["projects"] });
      setTimeout(() => {
        toaster({ display: false, type: "success", value: "" });
      }, 2000);
    },
    onError: async (err: any) => {
      const { response } = err;
      toaster({
        display: true,
        type: "danger",
        value: response.data.error || "Error",
      });
      setTimeout(
        () => toaster({ display: false, type: "success", value: "" }),
        2000
      );
    },
  });
};
