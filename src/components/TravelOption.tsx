const TravelOption = () => {
  return (
    <select className="w-full text-stone-800 transition-all duration-300 text-sm rounded-lg p-4 focus:ring focus:ring-green-500 focus:outline-none">
      <option value="Driving">Driving 🚗</option>
      <option value="Walking">Walking 🚶‍♂️</option>
    </select>
  );
};

export default TravelOption;
