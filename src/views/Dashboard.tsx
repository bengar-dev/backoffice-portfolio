import { TitleSection } from "../components/blocks/TitleSection";
import { SideBar } from "../components/nav/SideBar";
import { TemplateBlock } from "../components/ui/TemplateBlock";

export const Dashboard: React.FC = () => {
  return (
    <div className="relative">
      <SideBar />
      <TemplateBlock>
        <TitleSection title="Dashboard" />
      </TemplateBlock>
    </div>
  );
};
