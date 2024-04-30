import Button from "./Button";
import { calculateRouteFn } from "../utils/helperFunctions/helperFunctions";
import { CalculateRouteProps } from "../utils/types/types";
import { routeInit } from "../utils/initialStates/initialState";

const CalculateRoute = ({
  travelMode,
  route,
  setDirections,
  setRoute,
  updatePosition,
  setDuration,
  setDistance,
}: CalculateRouteProps) => {
  const calculateRouteHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const result = await calculateRouteFn(e, route, travelMode);
      if (result) {
        const duration = result?.routes[0].legs[0].duration?.text;
        const distance = result?.routes[0].legs[0].distance?.text;
        setDuration(duration ?? "");
        setDistance(distance ?? "");
        setDirections(result);
      }
    } catch (error) {
      console.log("calculateRouteHandler ne radi");
    }
  };
  const resetRoute = () => {
    // setDirections(google.maps.DirectionsResult);
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
        clickHandler={(e) => calculateRouteHandler(e)}
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
