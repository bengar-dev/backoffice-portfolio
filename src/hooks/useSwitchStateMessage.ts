import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

interface SwitchMessage {
  id: string;
  read: boolean;
}

export const useSwitchStateMessage = () => {
  const token = localStorage.getItem("token") || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SwitchMessage) => {
      const response = await axiosRequest({
        method: "put",
        target: `message/${data.id}`,
        data,
        token,
      });
      return response;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["messages"] });
    },
  });
};
