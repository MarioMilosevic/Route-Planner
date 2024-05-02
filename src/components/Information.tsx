import { InformationProps } from "../utils/types/types";
const Information = ({ title, stats }: InformationProps) => {
  const { totalDistance, distanceUnit, totalHours, totalMinutes } = stats;

  return (
    <div className="px-4 py-2 flex flex-col gap-2">
      <h2 className="text-xl">{title}</h2>
      <p>
        {title === "Duration"
          ? `${totalHours} hours ${totalMinutes} mins`
          : title === "Distance"
          ? `${totalDistance} ${distanceUnit}`
          : ""}
      </p>
    </div>
  );
};

export default Information;
