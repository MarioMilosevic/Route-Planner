import Button from "./Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { failure } from "../toast/failure";
import {
  calculateRouteFn,
  getCoordsForAddress,
  calculateDistance,
  calculateDuration,
} from "../utils/helperFunctions/helperFunctions";
import { CalculateRouteProps, destination } from "../utils/types/types";
import {
  routeInit,
  durationInit,
  distanceInit,
} from "../utils/initialStates/initialState";

const CalculateRoute = ({
  travelMode,
  route,
  setRoute,
  updatePosition,
  setDuration,
  setDistance,
  setDirections,
}: CalculateRouteProps) => {
  const { startingPoint, waypoints, endPoint } = route;
  const calculateRouteHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    arr: destination[]
  ) => {
    e.preventDefault();
    if (startingPoint && endPoint) {
      try {
        const promises = arr.map(async (element) => {
          const stopover = true;
          const location = await getCoordsForAddress(element.location);
          return { location, stopover };
        });
        const coordinates = await Promise.all(promises);
        const result = await calculateRouteFn(
          e,
          route,
          travelMode,
          coordinates
        );
        if (result) {
          const trips = result.routes[0].legs;
          setDistance(calculateDistance(trips));
          setDuration(calculateDuration(trips));
          setDirections(result);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      failure()
    }
  };

  const resetRoute = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (startingPoint && endPoint) {
      setRoute(routeInit);
      setDistance(distanceInit);
      setDuration(durationInit);
      setDirections(undefined);
      updatePosition();
    }
  };

  const isActive =
    route.startingPoint && route.endPoint
      ? "cursor-pointer"
      : "cursor-not-allowed";

  return (
    <>
      <div className={`w-full flex items-center  gap-2`}>
        <Button
          isActive={isActive}
          scale="medium"
          text="Calculate route"
          clickHandler={(e) => calculateRouteHandler(e, waypoints)}
        />
        <Button
          isActive={isActive}
          scale="medium"
          text="Reset"
          clickHandler={(e) => resetRoute(e)}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default CalculateRoute;
