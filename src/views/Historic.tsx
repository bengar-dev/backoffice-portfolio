import { Button } from "flowbite-react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ui";
import { TableData } from "../components/blocks/TableData";
import { TitleSection } from "../components/blocks/TitleSection";
import { HistoricForm } from "../components/forms/HistoricForm";
import { SideBar } from "../components/nav/SideBar";
import { ModalComponent } from "../components/ui/ModalComponent";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { useGetHistorics } from "../hooks/useGetHistorics";

export const Historic: React.FC = () => {
  const [toggleModal, setToggleModal] = useRecoilState<boolean>(modalState);
  const { data: historics } = useGetHistorics();
  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Historic" />
        <div className="mt-6">
          <ModalComponent title="Add new historic">
            <HistoricForm />
          </ModalComponent>
          <div className="p-2 flex justify-end space-x-2">
            <Button
              type="button"
              color="success"
              onClick={() => setToggleModal(true)}
            >
              Add new
            </Button>
          </div>
          {historics && historics.length > 0 && (
            <TableData
              data={historics}
              headers={["id", "description", "category", "date"]}
              target="historic"
            />
          )}
        </div>
      </TemplateBlock>
    </div>
  );
};
