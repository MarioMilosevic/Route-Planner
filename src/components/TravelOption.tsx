import { TravelModeProps } from "../utils/types/types";

const TravelOption = ({ travelMode, setTravelMode }: TravelModeProps) => {
  return (
    <select
      className="w-full text-stone-800 transition-all duration-300 text-sm rounded-lg p-4 focus:ring focus:ring-green-500 focus:outline-none"
      value={travelMode}
      onChange={(e) => setTravelMode(e.target.value)}
    >
      <option value="DRIVING">Driving 🚗</option>
      <option value="WALKING">Walking 🚶‍♂️</option>
    </select>
  );
};

export default TravelOption;
