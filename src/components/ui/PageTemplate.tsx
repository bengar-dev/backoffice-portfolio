interface PageTemplateProps {
  children: React.ReactNode[] | React.ReactNode;
  center?: boolean;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  center,
}) => {
  return (
    <div
      className={`relative min-h-screen bg-gray-900 w-full flex ${
        center && "items-center justify-center"
      }`}
    >
      {children}
    </div>
  );
};
