import React from "react";
import { useResetStats } from "../../hooks/useResetStats";
import { ButtonForm } from "../ui/ButtonForm";
import { StatsCard } from "../ui/StatsCard";

interface DashboardStatsProps {
  data: StatsProps;
}

type StatsProps = {
  historics: number;
  skills: number;
  projects: number;
  messages: number;
  visit: number;
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const reset = useResetStats();

  const handleReset = async () => {
    await reset.mutateAsync();
  };

  return (
    <div className="relative mt-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute top-1 right-1">
        <ButtonForm
          loading={reset.isLoading}
          type="button"
          value="Reset view stats"
          func={handleReset}
        />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-600">
        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
            <StatsCard title="Historics" value={data.historics} />
            <StatsCard title="Skills" value={data.skills} />
            <StatsCard title="Projects" value={data.projects} />
            <StatsCard title="Messages" value={data.messages} />
            <StatsCard title="Visits" value={data.visit} />
          </dl>
        </div>
      </div>
    </div>
  );
};
