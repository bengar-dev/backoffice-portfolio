interface StatsCardProps {
  title: string;
  value: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <dt className="mb-2 text-3xl font-extrabold">{value}</dt>
      <dd className="font-light text-gray-500 dark:text-gray-400">{title}</dd>
    </div>
  );
};
