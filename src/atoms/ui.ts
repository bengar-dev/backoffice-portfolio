import { atom, selector } from "recoil";
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

export const updateToaster = selector({
  key: "updateToaster",
  get: ({ get }) => {
    return get(toasterState);
  },
  set: ({ set, get }, newToaster) => {
    set(toasterState, newToaster);
  },
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const closeModal = selector({
  key: "closeModal",
  get: ({ get }) => {
    return get(modalState);
  },
  set: ({ set }, newState) => {
    set(modalState, newState);
  },
});
