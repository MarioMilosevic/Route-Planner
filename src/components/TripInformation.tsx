import Information from "./Information";
const TripInformation = () => {
  return (
    <div className="w-[80%] flex justify-between">
      <Information stats={stats} title="Duration" />
      <Information stats={stats} title="Distance" />
    </div>
  );
};

export default TripInformation;
