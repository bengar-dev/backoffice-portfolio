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
import { Toaster } from "../components/ui/Toaster";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { ProjectsProps, useGetProjects } from "../hooks/useGetProjects";

export const Projects: React.FC = () => {
  const deleteProject = useDeleteProject();
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

  const handleEditForm = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    if (!projects || projects.length === 0) return;
    const findOnProjects = projects.find((el) => el.id === id);
    if (!findOnProjects) return;
    setTitle(`Edit project : ${findOnProjects.name}`);
    setDefaultValuesForm(findOnProjects);
    modal(true);
  };

  const handleDeleteFunction = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    await deleteProject.mutateAsync(id);
  };
  return (
    <div className="relative">
      <Toaster />
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
              handleEditFunction={handleEditForm}
              handleDeleteFunction={handleDeleteFunction}
            />
          )}
          <LoadingPage isLoading={isLoading} />
        </div>
      </TemplateBlock>
    </div>
  );
};
