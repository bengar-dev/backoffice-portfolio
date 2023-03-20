import { useMutation } from "@tanstack/react-query";
import { axiosRequest } from "../services/axios";

type DataSignIn = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: DataSignIn) => {
      const { data: response } = await axiosRequest({
        method: "post",
        target: "users/signin",
        data,
      });
      return response;
    },
    onSuccess: (response: string) => {
      localStorage.setItem("token", response);
    },
  });
};
