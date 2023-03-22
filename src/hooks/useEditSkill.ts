import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState, updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";
import { SkillsProps } from "./useGetSkills";

export const useEditSkill = () => {
  const toaster = useSetRecoilState(updateToaster);
  const queryClient = useQueryClient();
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  return useMutation({
    mutationFn: async (data: SkillsProps) => {
      const { data: response } = await axiosRequest({
        method: "put",
        target: `skills/update/${data.id}`,
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
        value: "Skills has been edited",
      });
      await queryClient.refetchQueries({ queryKey: ["skills"] });
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
