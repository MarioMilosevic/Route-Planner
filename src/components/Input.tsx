import { InputComponentProps } from "../utils/types/types";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const Input = ({ text, route, setRoute }: InputComponentProps) => {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  console.log(route);
  console.log(text);

  const inputRoute =
    text === "Starting point" ? route.startingPoint : route.endPoint;

  const update = (value: string) => {
    setRoute((prev) => ({
      ...prev,
      startingPoint: text === "Starting point" ? value : prev.startingPoint,
      endPoint: text === "Destination" ? value : prev.endPoint,
    }));
  };

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      console.log(place);
      const formatedAddress = place.formatted_address;
      if (formatedAddress) {
        update(formatedAddress);
      }
    }
  }

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
      <input
        type="text"
        className="w-full mt-4 text-sm p-4 bg-none text-black rounded-lg transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-green-500 focus:outline-none"
        placeholder={text}
        value={inputRoute}
        onChange={(e) => update(e.target.value)}
      />
    </Autocomplete>
  );
};

export default Input;
