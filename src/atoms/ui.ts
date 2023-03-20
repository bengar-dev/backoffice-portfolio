import { atom } from "recoil";
import { StyleProps } from "../components/ui/Toaster";

interface toasterStateProps {
  display: boolean;
  type: StyleProps;
  value: string;
}

export const toasterState = atom<toasterStateProps>({
  key: "taosterState",
  default: {
    display: false,
    type: "info",
    value: "",
  },
});
