import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { updateCountMessagesState } from "../atoms/messages";
import { axiosRequest } from "../services/axios";

export type MessageProps = {
  id: string;
  email: string;
  text: string;
  title: string;
  read: boolean;
  createdAt: string;
};

export const useGetMessages = () => {
  const count = useSetRecoilState(updateCountMessagesState);
  const token = localStorage.getItem("token") || "";
  return useQuery({
    queryKey: ["messages"],
    queryFn: async (): Promise<MessageProps[]> => {
      const { data: response } = await axiosRequest({
        method: "get",
        target: "message",
        token,
      });
      return response;
    },
    onSuccess: (data: MessageProps[]) => {
      let countUnreadMessages = 0;
      for (const msg of data) {
        if (!msg.read) {
          countUnreadMessages++;
        }
      }
      count(countUnreadMessages);
    },
  });
};
