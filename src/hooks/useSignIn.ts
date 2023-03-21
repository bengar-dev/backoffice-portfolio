import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { updateToaster } from "../atoms/ui";
import { axiosRequest } from "../services/axios";

type DataSignIn = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const toaster = useSetRecoilState(updateToaster);
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
      toaster({
        display: true,
        type: "success",
        value: "You are gonna be redirect",
      });
      localStorage.setItem("token", response);
      setTimeout(() => {
        window.location.reload();
        toaster({ display: false, type: "success", value: "" });
      }, 2000);
    },
    onError: (err: any) => {
      const { response } = err;
      toaster({
        display: true,
        type: "danger",
        value: response.data.error || "Error",
      });
      setTimeout(() => {
        toaster({ display: false, type: "success", value: "" });
      }, 2000);
    },
  });
};
