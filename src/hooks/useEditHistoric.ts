import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState, updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";
import { HistoricProps } from "./useGetHistorics";

export const useEditHistoric = () => {
  const toaster = useSetRecoilState(updateToaster);
  const queryClient = useQueryClient();
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  return useMutation({
    mutationFn: async (data: HistoricProps) => {
      const { data: response } = await axiosRequest({
        method: "put",
        target: `about/historic/${data.id}`,
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
        value: "Historic has been edited",
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
