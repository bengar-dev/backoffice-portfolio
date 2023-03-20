import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import { Toast } from "flowbite-react";
import { useRecoilState } from "recoil";
import { toasterState } from "../../atoms/ui";

export type StyleProps = "info" | "success" | "warning" | "danger";

type handleStyleFn = (style: StyleProps) => string;
type handleIconsFn = (style: StyleProps) => React.ReactNode;

export const Toaster: React.FC = () => {
  const [toaster, setToaster] = useRecoilState(toasterState);

  const handleStyle: handleStyleFn = (style) => {
    switch (style) {
      case "info":
        return "text-blue-500";
      case "danger":
        return "text-red-500";
      case "success":
        return "text-emerald-500";
      case "warning":
        return "text-orange-500";
    }
  };

  const handleIcons: handleIconsFn = (style) => {
    switch (style) {
      case "info":
        return <AiOutlineInfoCircle />;
      case "success":
        return <AiOutlineCheckCircle />;
      case "warning":
        return <AiOutlineWarning />;
      case "danger":
        return <MdDangerous />;
    }
  };

  return (
    <>
      {toaster.display && (
        <div className="absolute top-10 right-4 space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
          <Toast>
            <div
              className={`text-lg flex items-center justify-center h-5 w-5 ${handleStyle(
                toaster.type
              )}`}
            >
              {handleIcons(toaster.type)}
            </div>
            <div className="pl-4 text-sm font-normal">{toaster.value}</div>
          </Toast>
        </div>
      )}
    </>
  );
};
