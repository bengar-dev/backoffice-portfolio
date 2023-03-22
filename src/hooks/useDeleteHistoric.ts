import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

export const useDeleteHistoric = () => {
    const queryClient = useQueryClient()
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
      await queryClient.refetchQueries({ queryKey: ["historics"] });
    }
  });
};
