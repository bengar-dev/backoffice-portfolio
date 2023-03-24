import { DashboardStats } from "../components/blocks/DashboardStats";
import { TitleSection } from "../components/blocks/TitleSection";
import { SideBar } from "../components/nav/SideBar";
import { TemplateBlock } from "../components/ui/TemplateBlock";
import { useGetStats } from "../hooks/useGetStats";

export const Dashboard: React.FC = () => {
  const { data: stats } = useGetStats();
  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Dashboard" />
        {stats && <DashboardStats data={stats} />}
      </TemplateBlock>
    </div>
  );
};
