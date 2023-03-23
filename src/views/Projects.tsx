import { Button } from "flowbite-react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms/ui";
import { TableData } from "../components/blocks/TableData";
import { TitleSection } from "../components/blocks/TitleSection";
import { ProjectForm } from "../components/forms/ProjectForm";
import { SideBar } from "../components/nav/SideBar";
import { LoadingPage } from "../components/ui/LoadingPage";
import { ModalComponent } from "../components/ui/ModalComponent";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { ProjectsProps, useGetProjects } from "../hooks/useGetProjects";

export const Projects: React.FC = () => {
  const { data: projects, isLoading } = useGetProjects();
  const [title, setTitle] = useState<string>("Add new project");
  const [defaultValuesForm, setDefaultValuesForm] = useState<
    ProjectsProps | false
  >(false);
  const modal = useSetRecoilState(modalState);

  const resetForm = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    modal(true);
    setTitle("Add new project");
    setDefaultValuesForm(false);
  };
  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Projects" />
        <div className="mt-6">
          <ModalComponent title={title}>
            <ProjectForm defaultValues={defaultValuesForm} />
          </ModalComponent>
          <div className="p-2 flex justify-end space-x-2">
            <Button type="button" color="success" onClick={resetForm}>
              Add new
            </Button>
          </div>
          {projects && projects.length > 0 && !isLoading && (
            <TableData
              data={projects}
              headers={["id", "name", "preview", "skillsId"]}
              target="projects"
              editEnable
            />
          )}
          <LoadingPage isLoading={isLoading} />
        </div>
      </TemplateBlock>
    </div>
  );
};
