import { Button } from "flowbite-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ui";
import { TableData } from "../components/blocks/TableData";
import { TitleSection } from "../components/blocks/TitleSection";
import { HistoricForm } from "../components/forms/HistoricForm";
import { SideBar } from "../components/nav/SideBar";
import { LoadingPage } from "../components/ui/LoadingPage";
import { ModalComponent } from "../components/ui/ModalComponent";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { useDeleteHistoric } from "../hooks/useDeleteHistoric";
import { HistoricProps, useGetHistorics } from "../hooks/useGetHistorics";

export const Historic: React.FC = () => {
  const deleteHistoric = useDeleteHistoric();
  const [defaultValuesForm, setDefaultValuesForm] = useState<
    HistoricProps | false
  >(false);
  const [title, setTitle] = useState<string>("Add new historic");
  const [toggleModal, setToggleModal] = useRecoilState<boolean>(modalState);
  const { data: historics, isLoading } = useGetHistorics();

  const handleEditForm = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    if (!historics || historics.length === 0) return;
    const findOnHistorics = historics.find((el) => el.id === id);
    if (!findOnHistorics) return;
    setToggleModal(true);
    setTitle(`Edit historic : ${findOnHistorics.id}`);
    setDefaultValuesForm(findOnHistorics);
  };

  const resetForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggleModal(true);
    setTitle("Add new historic");
    setDefaultValuesForm(false);
  };

  const handleDeleteForm = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    await deleteHistoric.mutateAsync(id);
  };

  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Historic" />
        <div className="mt-6">
          <ModalComponent title={title}>
            <HistoricForm defaultValues={defaultValuesForm} />
          </ModalComponent>
          <div className="p-2 flex justify-end space-x-2">
            <Button type="button" color="success" onClick={resetForm}>
              Add new
            </Button>
          </div>
          {historics && historics.length > 0 && !isLoading && (
            <TableData
              data={historics}
              headers={["id", "description", "category", "date"]}
              target="historic"
              handleEditFunction={handleEditForm}
              editEnable
              handleDeleteFunction={handleDeleteForm}
            />
          )}
          <LoadingPage isLoading={isLoading} />
        </div>
      </TemplateBlock>
    </div>
  );
};
