import { Button } from "flowbite-react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms/ui";
import { TableData } from "../components/blocks/TableData";
import { TitleSection } from "../components/blocks/TitleSection";
import { SkillForm } from "../components/forms/SkillForm";
import { SideBar } from "../components/nav/SideBar";
import { LoadingPage } from "../components/ui/LoadingPage";
import { ModalComponent } from "../components/ui/ModalComponent";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { Toaster } from "../components/ui/Toaster";
import { useDeleteSkill } from "../hooks/useDeleteSkill";
import { SkillsProps, useGetSkills } from "../hooks/useGetSkills";
import { useSwitchDisplaySkill } from "../hooks/useSwitchDisplaySkill";

export const Skills: React.FC = () => {
  const displaySkill = useSwitchDisplaySkill();
  const deleteSkill = useDeleteSkill();
  const { data: skills, isLoading } = useGetSkills();
  const [title, setTitle] = useState<string>("Add new skill");
  const [defaultValuesForm, setDefaultValuesForm] = useState<
    SkillsProps | false
  >(false);
  const modal = useSetRecoilState(modalState);

  const resetForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    modal(true);
    setTitle("Add new skill");
    setDefaultValuesForm(false);
  };

  const handleDisplayButton = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    await displaySkill.mutateAsync({ display: event.target.checked, id });
  };

  const handleEditForm = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    if (!skills || skills.length === 0) return;
    const findOnSkills = skills.find((el) => el.id === id);
    if (!findOnSkills) return;
    setTitle(`Edit skill : ${findOnSkills.id}`);
    setDefaultValuesForm(findOnSkills);
    modal(true);
  };

  const handleDeleteForm = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    await deleteSkill.mutateAsync(id);
  };
  return (
    <div className="relative">
      <Toaster />
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Skills" />
        <div className="mt-6">
          <ModalComponent title={title}>
            <SkillForm defaultValues={defaultValuesForm} />
          </ModalComponent>
          <div className="p-2 flex justify-end space-x-2">
            <Button type="button" color="success" onClick={resetForm}>
              Add new
            </Button>
          </div>
          {skills && skills.length > 0 && !isLoading && (
            <TableData
              data={skills}
              headers={["id", "name", "description", "display"]}
              target="skills"
              handleEditFunction={handleEditForm}
              editEnable
              handleDeleteFunction={handleDeleteForm}
              handleDisplayFunction={handleDisplayButton}
            />
          )}
          <LoadingPage isLoading={isLoading} />
        </div>
      </TemplateBlock>
    </div>
  );
};
