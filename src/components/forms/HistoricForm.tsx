import { Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { HistoricCategory, HistoricProps } from "../../hooks/useGetHistorics";
import { ButtonForm } from "../ui/ButtonForm";

export const HistoricForm = () => {
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
  return (
    <form className="flex flex-col">
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
      <TextInput id="date" type="date" required />
      <div className="mt-2 mb-2 block">
        <Label htmlFor="category" value="Select category" />
      </div>
      <Select id="category" required>
        {historicCategory.map((el) => (
          <option key={el} value={el}>
            {upperFirstChar(el)}
          </option>
        ))}
      </Select>
      <div className="mt-2">
        <ButtonForm loading={false} type="submit" value="Submit" fullWidth />
      </div>
    </form>
  );
};
