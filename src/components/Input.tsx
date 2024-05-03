import { InputComponentProps } from "../utils/types/types";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const Input = ({
  id,
  text,
  route,
  setRoute,
}: InputComponentProps) => {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const { startingPoint, waypoints, endPoint } = route;
  // const [selectedId, setSelectedId] = useState("");
  const inputRoute =
    text === "Starting point"
      ? startingPoint
      : text === "Destination"
      ? endPoint
      : null


  const update = (value: string) => {
  setRoute((prev) => ({
    ...prev,
    startingPoint: text === "Starting point" ? value : prev.startingPoint,
    waypoints:
      text === "Waypoint"
        ? waypoints.map((point) => {
            console.log(point);
            return point.placeId === id ? { ...point, location: value } : point;
          })
        : prev.waypoints,
    endPoint: text === "Destination" ? value : prev.endPoint,
  }));
};


  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }



  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      const formatedAddress = place.formatted_address;
      if (formatedAddress) {
        update(formatedAddress);
      }
    }
  }
  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
      <input
        id={id}
        type="text"
        className="w-full mt-4 text-sm p-4 bg-none text-black rounded-lg transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-green-500 focus:outline-none"
        placeholder={text}
        value={inputRoute}
        onChange={(e) => update(e.target.value)}
        // onClick={() => setSelectedId(id)}
      />
    </Autocomplete>
  );
};

export default Input;
