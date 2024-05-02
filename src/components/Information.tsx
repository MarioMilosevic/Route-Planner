import { InformationProps } from "../utils/types/types";
const Information = ({ title, stats }: InformationProps) => {
  console.log(stats)
  return (
    <div className="px-4 py-2 flex flex-col gap-2">
          <h2 className="text-xl">{title}</h2>
      <p>{stats.totalDistance} {stats.distanceUnit }</p>
    </div>
  );
}

export default Information
