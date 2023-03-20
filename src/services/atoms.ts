import { useRecoilState } from "recoil";
import { toasterState } from "../atoms/ui";

export const handleToggleToaster = (value: boolean) => {
  const [toaster, setToaster] = useRecoilState(toasterState);

  setToaster({ ...toaster, display: value });
};
