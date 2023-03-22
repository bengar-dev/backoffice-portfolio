import { CgSpinner } from "react-icons/cg";

interface LoadingPageProps {
  isLoading: boolean;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="w-full h-20 flex items-center justify-center">
          <CgSpinner className="text-2xl text-rose-500 animate-spin" />
        </div>
      )}
    </>
  );
};
