import { useMutation } from "@tanstack/react-query";
import React from "react";
import { axiosRequest } from "../services/axios";
import { AboutProps } from "./useGetAbout";

export const useEditAbout = () => {
  const token = localStorage.getItem("token") || "";
  return useMutation({
    mutationFn: async (data: AboutProps) => {
      const { data: response } = await axiosRequest({
        method: "post",
        target: "about",
        data,
        token,
      });
      return response;
    },
    onSuccess: (data: any) => {
      console.log("data", data);
    },
  });
};
