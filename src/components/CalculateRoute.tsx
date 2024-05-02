import Button from "./Button";
import {
  calculateRouteFn,
  getCoordsForAddress,
  calculateDistance,
  calculateDuration
} from "../utils/helperFunctions/helperFunctions";
import { CalculateRouteProps } from "../utils/types/types";
import { routeInit } from "../utils/initialStates/initialState";

const CalculateRoute = ({
  travelMode,
  route,
  setRoute,
  updatePosition,
  setDuration,
  setDistance,
  setDirections,
}: CalculateRouteProps) => {
  const { waypoints } = route;
  console.log(waypoints);

  const calculateRouteHandler = async (e, arr) => {
    try {
      const promises = arr.map(async (element) => {
        const stopover = true;
        const location = await getCoordsForAddress(element.location);
        return { location, stopover };
      });
      const coordinates = await Promise.all(promises);
      console.log(coordinates);
      const result = await calculateRouteFn(e, route, travelMode, coordinates);
      if (result) {
        console.log(result);
        const trips = result.routes[0].legs;
        console.log(trips);
        setDistance(calculateDistance(trips));
        setDuration(calculateDuration(trips))
        setDirections(result);
      }
    } catch (error) {
      console.log("calculateRouteHandler ne radi", error);
    }
  };

  const resetRoute = () => {
    setRoute(routeInit);
    setDistance("");
    setDuration("");
    updatePosition();
  };

  const isActive =
    route.startingPoint && route.endPoint
      ? "cursor-pointer"
      : "cursor-not-allowed";

  return (
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
        clickHandler={resetRoute}
      />
    </div>
  );
};

export default CalculateRoute;
