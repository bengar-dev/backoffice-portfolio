import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState, updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";

export const useResetStats = () => {
  const toaster = useSetRecoilState(updateToaster);
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axiosRequest({ method: "post", target: "stats/reset", token });
    },
    onSuccess: async () => {
      modal(false);
      toaster({
        display: true,
        type: "success",
        value: "Stats has been reset",
      });
      await queryClient.refetchQueries({ queryKey: ["stats"] });
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
