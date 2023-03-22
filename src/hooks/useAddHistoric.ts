import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms/ui";
import { axiosRequest } from "../services/axios";
import { HistoricProps } from "./useGetHistorics";

export const useAddHistoric = () => {
  const modal = useSetRecoilState(modalState);
  const token = localStorage.getItem("token") || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: HistoricProps) => {
      const { data: response } = await axiosRequest({
        method: "post",
        target: "about/historic",
        data,
        token,
      });

      return response;
    },
    onSuccess: async () => {
      modal(false);
      await queryClient.refetchQueries({ queryKey: ["historics"] });
    },
  });
};
