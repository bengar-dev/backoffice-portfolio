import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms/ui";
import { TableData } from "../components/blocks/TableData";
import { TitleSection } from "../components/blocks/TitleSection";
import { SideBar } from "../components/nav/SideBar";
import { ModalComponent } from "../components/ui/ModalComponent";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { Toaster } from "../components/ui/Toaster";
import { useDeleteMessage } from "../hooks/useDeleteMessage";
import { useGetMessages } from "../hooks/useGetMessages";
import { useSwitchStateMessage } from "../hooks/useSwitchStateMessage";

export const Messages: React.FC = () => {
  const switchMessage = useSwitchStateMessage();
  const deleteMessage = useDeleteMessage();
  const [title, setTitle] = useState<string>("");
  const [contentMsg, setContentMessage] = useState<string>("");
  const { data: messages, isLoading } = useGetMessages();
  const modal = useSetRecoilState(modalState);

  const handleViewDetails = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    const findOnMessages = messages?.find((msg) => msg.id === id);
    if (!findOnMessages) return;
    setContentMessage(findOnMessages.text);
    setTitle(
      `${findOnMessages.title} by ${findOnMessages.email.split("@")[0]}`
    );
    modal(true);
  };

  const handleDisplayMessages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    await switchMessage.mutateAsync({ id, read: event.target.checked });
  };

  const handleDeleteFunction = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    await deleteMessage.mutateAsync(id);
  };

  return (
    <div className="relative">
      <Toaster />
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Messages" />
        <div className="mt-6 w-full">
          <ModalComponent title={title}>
            <div>{contentMsg}</div>
          </ModalComponent>
          {messages && messages.length > 0 && !isLoading && (
            <TableData
              data={messages}
              headers={["id", "email", "title", "createdAt", "read"]}
              target="messages"
              viewEnable
              handleViewFunction={handleViewDetails}
              handleDisplayFunction={handleDisplayMessages}
              handleDeleteFunction={handleDeleteFunction}
            />
          )}
          {messages && messages.length === 0 && (
            <span className="text-2xl font-medium">
              There is no messages yet...
            </span>
          )}
        </div>
      </TemplateBlock>
    </div>
  );
};
