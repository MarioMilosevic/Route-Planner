import { useState, useEffect } from "react";
import { PositionState } from "../utils/types/types";
import { currentPositionInit } from "../utils/initialStates/initialState";

const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] =
    useState<PositionState>(currentPositionInit);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    } else {
      console.error("Geolocation is not available in your browser");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

    const updatePosition = () => {
    getCurrentLocation();
  };

  return { currentPosition, updatePosition, setCurrentPosition };
};

export default useGeolocation;

