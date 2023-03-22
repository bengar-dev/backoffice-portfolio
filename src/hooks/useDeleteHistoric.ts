import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";

export const useDeleteHistoric = () => {
  const toaster = useSetRecoilState(updateToaster);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token") || "";
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosRequest({
        method: "delete",
        target: `about/historic/${id}`,
        token,
      });
    },
    onSuccess: async () => {
      toaster({
        display: true,
        type: "success",
        value: "Historic has been deleted",
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
