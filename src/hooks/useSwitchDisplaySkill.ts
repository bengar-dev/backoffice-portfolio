import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState, updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";

export type DisplaySkillProps = {
  id: string;
  display: boolean;
};

export const useSwitchDisplaySkill = () => {
  const toaster = useSetRecoilState(updateToaster);
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DisplaySkillProps) => {
      const response = await axiosRequest({
        method: "put",
        target: `skills/${data.id}`,
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
        value: "Skill display has been updated",
      });
      await queryClient.refetchQueries({ queryKey: ["historics"] });
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
