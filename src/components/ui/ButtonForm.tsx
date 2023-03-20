import { Button } from "flowbite-react";
import { CgSpinner } from "react-icons/cg";

interface ButtonFormProps {
  value: string;
  type: "submit" | "button";
  loading: boolean;
  color?:
    | "info"
    | "gray"
    | "dark"
    | "light"
    | "success"
    | "failure"
    | "warning"
    | "purple";
}

export const ButtonForm: React.FC<ButtonFormProps> = ({
  loading,
  type,
  color = "info",
  value,
}) => {
  return (
    <Button color={color} type={type}>
      {loading ? <CgSpinner className="text-lg animate-spin" /> : value}{" "}
    </Button>
  );
};
