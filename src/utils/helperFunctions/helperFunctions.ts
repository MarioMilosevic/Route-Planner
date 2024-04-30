import { RouteState } from "../types/types";

export const calculateRouteFn = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  route:RouteState,
  travelMode:string
) => {
  e.preventDefault();
  console.log(travelMode);
  const { startingPoint, endPoint, waypoints } = route;
  if (startingPoint === "" || endPoint === "") {
    return;
  }
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
