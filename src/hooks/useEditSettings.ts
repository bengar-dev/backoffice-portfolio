import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState, updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";
import { MediasProps } from "./useGetMedias";

export const useEditSettings = () => {
  const toaster = useSetRecoilState(updateToaster);
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MediasProps) => {
      const { data: response } = await axiosRequest({
        method: "put",
        target: "medias",
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
        value: "Settings has been edited",
      });
      await queryClient.refetchQueries({ queryKey: ["medias"] });
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
