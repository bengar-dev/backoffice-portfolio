interface TemplateBlockProps {
  children: React.ReactNode | React.ReactNode[];
}

export const TemplateBlock: React.FC<TemplateBlockProps> = ({ children }) => {
  return <div className="flex flex-col ml-64 p-8 pt-12">{children}</div>;
};
