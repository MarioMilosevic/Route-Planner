import axios from "axios";
import { RouteState, FetchWaypointElements } from "../types/types";
import { distanceInit } from "../initialStates/initialState";

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

const legs = [
  {
    distance: {
      text: "61.7 mi",
    },
  },
  {
    distance: {
      text: "63.0 mi",
    },
  },
  {
    distance: {
      text: "1.7 mi",
    },
  },
];

export const calculateDistance = (arr) => {
  const result = arr.reduce(
    (acc, curr) => {
      const distanceText = curr.distance.text;
      const [distanceValue, distanceUnit] = distanceText.split(" ");
      const distance = parseFloat(distanceValue);
      return {
        totalDistance: acc.totalDistance + distance,
        distanceUnit,
      };
    },
    { totalDistance: 0, distanceUnit: "" }
  ); // Adding initial object for the accumulator

  // Apply toFixed(1) to totalDistance
  result.totalDistance = result.totalDistance.toFixed(1);

  return result;
};



// const updatedArr = legs.map((leg) => {
//   const distanceText = leg.distance.text;
//   const [distanceValue, distanceUnit] = distanceText.split(" ");
//   return {
//     distance: {
//       value: parseFloat(distanceValue),
//       unit: distanceUnit,
//     },
//   };
// });

// const totalDistance = updatedArr.reduce((total, leg) => {
//   const { value, unit } = leg.distance;
//   return total + value;
// }, 0);

// console.log(totalDistance);

// const trips = [
//   {
//     duration: {
//       text: "29 mins",
//     },
//   },
//   {
//     duration: {
//       text: "1 hour 7 mins",
//     },
//   },
//   {
//     duration: {
//       text: "15 hours 20 mins",
//     },
//   },
// ];

// const totalDuration = trips.r(
//   (acc, curr) => acc + parseFloat(curr.duration.text),
//   0
// );
