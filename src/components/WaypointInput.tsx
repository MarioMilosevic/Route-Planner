import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { WaypointInputProps } from "../utils/types/types";

const WaypointInput = ({ id, setRoute }:WaypointInputProps) => {
      const [searchResult, setSearchResult] =
        useState<google.maps.places.Autocomplete>();
    
  const updateWaypoint = (value:string) => {
    setRoute((prev) => ({
      ...prev,
      waypoints: prev.waypoints.map((point) =>
        point.placeId === id ? { ...point, location: value } : point
      ),
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
          updateWaypoint(formatedAddress);
        //   updateRef(formatedAddress);
        }
      }
    }
 return (
   <Autocomplete onLoad={onLoad} onPlaceChanged={locationSelected}>
     <input
       id={id}
       type="text"
       className="w-full mt-4 text-sm p-4 bg-none text-black rounded-lg transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-green-500 focus:outline-none"
       placeholder="Waypoint"
    //    ref={ref}
       // value={inputRoute}
       onChange={(e) => updateWaypoint(e.target.value)}
       // onChange={(e) => update(e.target.value)}
       // onClick={() => setSelectedId(id)}
     />
   </Autocomplete>
 );
}

export default WaypointInput
