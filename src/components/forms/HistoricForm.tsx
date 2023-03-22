import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAddHistoric } from "../../hooks/useAddHistoric";
import { HistoricCategory, HistoricProps } from "../../hooks/useGetHistorics";
import { ButtonForm } from "../ui/ButtonForm";
import _ from "lodash";
import { useEditHistoric } from "../../hooks/useEditHistoric";

interface HistoricFormProps {
  defaultValues?: HistoricProps | false;
}

export const HistoricForm: React.FC<HistoricFormProps> = ({
  defaultValues,
}) => {
  const mutationHistoric = useAddHistoric();
  const editHistoric = useEditHistoric();
  const historicCategory: HistoricCategory[] = [
    "school",
    "work",
    "trophee",
    "graduate",
    "certif",
    "computer",
  ];
  const [form, setForm] = useState<HistoricProps>({
    category: "school",
    date: "",
    description: "",
  });

  const upperFirstChar = (str: HistoricCategory): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (defaultValues) {
      await editHistoric.mutateAsync(form);
    } else {
      await mutationHistoric.mutateAsync(form);
    }
  };

  useEffect(() => {
    if (mutationHistoric.isSuccess || editHistoric.isSuccess) {
      setForm({
        category: "school",
        date: "",
        description: "",
      });
    }
    if (defaultValues && !_.isEqual(defaultValues, form)) {
      setForm(defaultValues);
    }
    if (!defaultValues) {
      setForm({
        category: "school",
        date: "",
        description: "",
      });
    }
  }, [mutationHistoric.isSuccess, editHistoric.isSuccess, defaultValues]);

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <div className="mb-2 block">
        <Label htmlFor="description" value="Description" />
      </div>
      <TextInput
        id="description"
        type="text"
        placeholder="Description"
        required={true}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="date" value="Date" />
      </div>
      <TextInput
        id="date"
        type="date"
        required
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="category" value="Select category" />
      </div>
      <Select
        id="category"
        required
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value as HistoricCategory })
        }
      >
        {historicCategory.map((el) => (
          <option key={el} value={el}>
            {upperFirstChar(el)}
          </option>
        ))}
      </Select>
      <div className="mt-2">
        <ButtonForm
          loading={mutationHistoric.isLoading || editHistoric.isLoading}
          type="submit"
          value={defaultValues ? "Edit" : "Submit"}
          fullWidth
          color={defaultValues ? "warning" : "info"}
        />
      </div>
    </form>
  );
};
