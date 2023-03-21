import { Button } from "flowbite-react";
import { CgSpinner } from "react-icons/cg";

interface ButtonFormProps {
  value: string | React.ReactNode;
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
  fullWidth?: boolean;
  func?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonForm: React.FC<ButtonFormProps> = ({
  loading,
  type,
  color = "info",
  value,
  fullWidth = false,
  func,
}) => {
  return (
    <Button
      color={color}
      type={type}
      fullSized={fullWidth}
      onClick={(event) => {
        if (func) {
          func(event);
        }
      }}
    >
      {loading ? <CgSpinner className="text-lg animate-spin" /> : value}{" "}
    </Button>
  );
};
