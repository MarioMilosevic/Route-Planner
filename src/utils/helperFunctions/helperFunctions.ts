import axios from "axios";
import { RouteState, FetchWaypointElements } from "../types/types";

export const calculateRouteFn = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  route: RouteState,
  travelMode: string,
  waypoints: FetchWaypointElements[]
) => {
  e.preventDefault();
  const { startingPoint, endPoint } = route;
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
  return results;
};

export async function getCoordsForAddress(address: string) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY
    }`
  );
  const data = response.data;
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

export const calculateDistance = (arr: google.maps.DirectionsLeg[]) => {
  const result = arr.reduce(
    (acc, curr) => {
      const distanceText = curr.distance?.text;
      if (distanceText) {
        const [distanceValue, distanceUnit] = distanceText.split(" ");
        const distance = parseFloat(distanceValue);
        return {
          totalDistance: acc.totalDistance + distance,
          distanceUnit,
        };
      } else {
        return acc;
      }
    },
    { totalDistance: 0, distanceUnit: "" }
  );
  result.totalDistance = parseFloat(result.totalDistance.toFixed(1));
  return result;
};

export const calculateDuration = (arr: google.maps.DirectionsLeg[]) => {
  const totalInformation = arr
    .map((trip) => trip.duration?.text.split(" "))
    .filter((el): el is string[] => el !== undefined)
    .reduce(
      (acc, el) => {
        const [hours, minutes] =
          el.length > 2
            ? [parseInt(el[0], 10), parseInt(el[2], 10)]
            : [0, parseInt(el[0], 10)];
        acc.totalHours += hours;
        acc.totalMinutes += minutes;
        return acc;
      },
      { totalHours: 0, totalMinutes: 0 }
    );

  totalInformation.totalHours += Math.floor(totalInformation.totalMinutes / 60);
  totalInformation.totalMinutes %= 60;

  return totalInformation;
};

