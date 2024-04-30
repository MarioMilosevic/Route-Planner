import { useRouteSlice } from "../hooks/useRouteSlice";
import { InputComponentProps } from "../utils/types/types";
import { useDispatch } from "react-redux";

import {
  addStartPoint,
  addEndPoint,
} from "../redux/features/routeSlice/routeSlice";

import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const Input = ({ text }: InputComponentProps) => {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  
  const { startingPoint, endPoint } = useRouteSlice();
  const route = text === "Starting point" ? startingPoint : endPoint;
  const dispatch = useDispatch();

  const update = (value: string) => {
    text === "Starting point"
      ? dispatch(addStartPoint(value))
      : dispatch(addEndPoint(value));
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
        type="text"
        className="w-full mt-4 text-sm p-4 bg-none text-black rounded-lg transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-green-500 focus:outline-none"
        placeholder={text}
        value={route}
        onChange={(e) => update(e.target.value)}
      />
    </Autocomplete>
  );
};

export default Input;
