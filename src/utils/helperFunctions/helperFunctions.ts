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
  );
  result.totalDistance = result.totalDistance.toFixed(1);
  return result;
};

const tripsDuration = [
  {
    duration: {
      text: "29 mins",
    },
  },
  {
    duration: {
      text: "1 hour 7 mins",
    },
  },
  {
    duration: {
      text: "15 hours 20 mins",
    },
  },
];

// const splitDurations = tripsDuration.map((trip) =>
//   trip.duration.text.split(" ")
// );
// console.log(splitDurations)

// const information = splitDurations.map((el) => {
//   let [hourValue, minutesValue] = el.length > 2 ? [el[0], el[2]] : [0, el[0]];
//   return { hourValue, minutesValue };
// });

// const totalInformation = information.reduce(
//   (acc, curr) => {
//     acc.totalHours += parseInt(curr.hourValue, 10);
//     acc.totalMinutes += parseInt(curr.minutesValue, 10);
//     return acc;
//   },
//   { totalHours: 0, totalMinutes: 0 }
// );

// // If the total minutes exceed 60
// if (totalInformation.totalMinutes >= 60) {
//   // Divide minutes by 60 and add the result to hours
//   totalInformation.totalHours += Math.floor(totalInformation.totalMinutes / 60);
//   // Update total minutes with the remainder after division
//   totalInformation.totalMinutes %= 60;
// }

// console.log(totalInformation);

export const calculateDuration = (arr) => {
  const totalInformation = arr
    .map((trip) => trip.duration.text.split(" "))
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

  return totalInformation; // Returning the calculated total information
};



// console.log("odje gledam",mario);

// const getTotalMinutes = (trips) => {
//   return trips.reduce((total, trip) => {
//     const text = trip.duration.text;
//     if (text.includes("hour")) {
//       const [hours, minutes] = text.split(" ");
//       console.log(hours)
//       console.log(minutes)
//       return total + parseInt(hours) * 60 + parseInt(minutes);
//     } else {
//       return total + parseInt(text);
//     }
//   }, 0);
// };

// const totalMinutes = getTotalMinutes(tripsDuration);
// console.log("Total Duration in Minutes:", totalMinutes);
