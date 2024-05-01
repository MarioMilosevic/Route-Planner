import axios from "axios";
import { RouteState } from "../types/types";

export const calculateRouteFn = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  route: RouteState,
  travelMode: string,
  waypoints
) => {
  e.preventDefault();
  const { startingPoint, endPoint } = route;
  if (startingPoint === "" || endPoint === "") {
    return;
  }
  console.log("ovo saljem", waypoints);
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: startingPoint,
    destination: endPoint,
    waypoints,
    travelMode:
      travelMode === "DRIVING"
        ? google.maps.TravelMode.DRIVING
        : google.maps.TravelMode.WALKING,
  });
  console.log(results);
  return results;
};

// const urlPlaceId = `https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=${import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}`;
// ovo ispod sam nasao
// const urlAdress = `https://maps.googleapis.com/maps/api/geocode/json?address=${nekaAdresa}&key=${import.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}`;

export async function getCoordsForAddress(address: string) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY
    }`
  );
  console.log(response);
  const data = response.data;
  console.log(data);
  const coordinates = data.results[0].geometry.location;
  console.log(coordinates);
  return coordinates;
}
