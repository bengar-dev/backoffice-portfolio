interface TitleSectionProps {
  title: string;
}

export const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
  return (
    <h1 className="font-bold uppercase text-3xl first-letter:text-rose-500">
      {title}
    </h1>
  );
};
