import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { SkillsProps } from "../../hooks/useGetSkills";
import { ButtonForm } from "../ui/ButtonForm";
import _ from "lodash";

interface SkillFormProps {
  defaultValues?: SkillsProps | false;
}

export const SkillForm: React.FC<SkillFormProps> = ({ defaultValues }) => {
  const [form, setForm] = useState<SkillsProps>({
    description: "",
    name: "",
    urlLogo: "",
  });

  useEffect(() => {
    if (defaultValues && !_.isEqual(defaultValues, form)) {
      setForm(defaultValues);
    }
    if (!defaultValues) {
      setForm({
        description: "",
        name: "",
        urlLogo: "",
      });
    }
  }, [defaultValues]);

  const onSubmit = () => {};
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <div className="mb-2 block">
        <Label htmlFor="name" value="Skill name" />
      </div>
      <TextInput
        id="name"
        type="text"
        placeholder="Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="description" value="Description" />
      </div>
      <TextInput
        id="description"
        type="text"
        placeholder="Description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="icon-skill" value="Code icon" />
      </div>
      <TextInput
        id="icon-skill"
        type="text"
        placeholder="Code"
        required
        value={form.urlLogo}
        onChange={(e) => setForm({ ...form, urlLogo: e.target.value })}
      />
      <div className="mt-2">
        <ButtonForm
          loading={false}
          type="submit"
          value="Submit"
          fullWidth
          color="info"
        />
      </div>
    </form>
  );
};
