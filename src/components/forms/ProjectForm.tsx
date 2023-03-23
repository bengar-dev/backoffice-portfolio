import { Badge, Button, Label, TextInput } from "flowbite-react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import ReactQuill from "react-quill";
import { useAddProject } from "../../hooks/useAddProject";
import { useEditProject } from "../../hooks/useEditProject";
import { ProjectsProps } from "../../hooks/useGetProjects";
import { useGetSkills } from "../../hooks/useGetSkills";
import { ButtonForm } from "../ui/ButtonForm";

interface ProjectFormProps {
  defaultValues?: ProjectsProps | false;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ defaultValues }) => {
  const addProject = useAddProject();
  const editProject = useEditProject();
  const { data: skills } = useGetSkills();
  const [content, setContent] = useState<string>("");
  const [pictureInput, setPictureInput] = useState<string>("");
  const [form, setForm] = useState<ProjectsProps>({
    description: "",
    name: "",
    pictures: [],
    skillsId: [],
    preview: "",
    urlImage: "",
    github: "",
    live: "",
  });

  const handleSkillsState = (id?: string): void => {
    if (!id) return;
    const newArray =
      form.skillsId && form.skillsId.length > 0 ? [...form.skillsId] : [];
    const findOnSkills = skills?.find((el) => el.id === id);
    const findOnState = newArray.findIndex((el) => el.id === id);
    if (findOnSkills && findOnState === -1) {
      newArray.push(findOnSkills);
    } else if (findOnState !== -1) {
      newArray.splice(findOnState, 1);
    }
    setForm({ ...form, skillsId: newArray });
  };

  const findActiveSkill = (id: string): boolean => {
    const newArray =
      form.skillsId && form.skillsId.length > 0 ? [...form.skillsId] : [];
    const findOnState = newArray.findIndex((el) => el.id === id);
    if (findOnState === -1) return false;
    return true;
  };

  const handleInputPicture = (): void => {
    if (!Boolean(pictureInput)) return;
    const newArray = [...form.pictures];
    newArray.push(pictureInput);
    setForm({ ...form, pictures: newArray });
    setPictureInput("");
  };

  const handleDeletePicture = (index: number) => {
    if (index !== -1) {
      const newArray = [...form.pictures];
      newArray.splice(index, 1);
      setForm({ ...form, pictures: newArray });
    }
  };

  useEffect(() => {
    if (defaultValues && !_.isEqual(defaultValues, form)) {
      setContent(defaultValues.description);
      setForm(defaultValues);
    }
    if (!defaultValues) {
      setContent("");
      setForm({
        description: "",
        name: "",
        pictures: [],
        skillsId: [],
        preview: "",
        urlImage: "",
        github: "",
        live: "",
      });
    }
  }, [defaultValues]);

  useEffect(() => {
    if (!_.isEqual(form.description, content)) {
      setForm({ ...form, description: content });
    }
  }, [form, content]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (defaultValues) {
      await editProject.mutateAsync(form);
    } else {
      await addProject.mutateAsync(form);
    }
  };
  return (
    <form className="w-full flex flex-col" onSubmit={onSubmit}>
      <div className="mb-2 block">
        <Label htmlFor="name" value="Name" />
      </div>
      <TextInput
        id="name"
        type="text"
        placeholder="Name"
        required={true}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="description" value="Description" />
      </div>
      <ReactQuill value={content} onChange={setContent} />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="skills" value="Skills" />
      </div>
      <div className="w-full flex justify-center flex-wrap space-x-2">
        {skills &&
          skills.length > 0 &&
          skills.map((el) => (
            <Badge
              key={el.id}
              color={el.id && findActiveSkill(el.id) ? "purple" : "info"}
              className="mb-1 cursor-pointer"
              onClick={() => handleSkillsState(el.id)}
            >
              {el.name}
            </Badge>
          ))}
      </div>
      <div className="mt-2 mb-2 block">
        <Label htmlFor="preview" value="Preview" />
      </div>
      <TextInput
        id="preview"
        type="text"
        placeholder="Preview"
        required={true}
        value={form.preview}
        onChange={(e) => setForm({ ...form, preview: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="preview-img" value="Image preview url" />
      </div>
      <TextInput
        id="preview-img"
        type="url"
        placeholder="Image url"
        required={true}
        value={form.urlImage}
        onChange={(e) => setForm({ ...form, urlImage: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="github" value="Github repo url" />
      </div>
      <TextInput
        id="github"
        type="url"
        placeholder="Repo url"
        required={true}
        value={form.github}
        onChange={(e) => setForm({ ...form, github: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="live" value="Live app url" />
      </div>
      <TextInput
        id="live"
        type="url"
        placeholder="Live app url"
        required={true}
        value={form.live}
        onChange={(e) => setForm({ ...form, live: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="pictures" value="Pictures url" />
      </div>
      <div className="flex space-x-2">
        <TextInput
          className="w-full"
          id="pictures"
          type="url"
          value={pictureInput}
          placeholder="Picture url"
          onChange={(e) => setPictureInput(e.target.value)}
        />
        <Button color="dark" onClick={handleInputPicture}>
          <AiOutlinePlusCircle className="text-white text-xl" />
        </Button>
      </div>
      <div className="p-4 text-xs flex flex-col space-y-2">
        {form.pictures.map((el, index) => (
          <Badge
            key={`${el}-${index}`}
            color="light"
            className="w-max hover:bg-gray-900 hover:text-white cursor-pointer"
            onClick={() => handleDeletePicture(index)}
          >
            {el}
          </Badge>
        ))}
      </div>
      <div className="mt-2">
        <ButtonForm
          loading={false}
          type="submit"
          value={defaultValues ? "Edit" : "Submit"}
          fullWidth
          color={defaultValues ? "warning" : "info"}
        />
      </div>
    </form>
  );
};
