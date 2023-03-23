import { ChangeEventHandler, useEffect, useState } from "react";

interface ToggleButtonProps {
  status: boolean;
  func?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  id?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  id,
  func,
  status,
}) => {
  const [check, setCheck] = useState<boolean>(status);

  useEffect(() => {
    setCheck(status);
  }, [status]);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!func || !id) return;
    setCheck(event.target.checked);
    func(event, id);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={check}
        onChange={(e) => handleChecked(e)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};
