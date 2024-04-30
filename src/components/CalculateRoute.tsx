import Button from "./Button";
import { calculateRouteFn } from "../utils/helperFunctions/helperFunctions";
import { CalculaterRouteProps } from "../utils/types/types";
import { directionsInit, routeInit } from "../utils/initialStates/initialState";

const CalculateRoute = ({travelMode ,route, setDirections, setRoute, setCurrentPosition, updatePosition }: CalculaterRouteProps) => {
  const calculateRouteHandler = async (e) => {
    try {
      const result = await calculateRouteFn(e, route ,travelMode);
      // const {origin, destination} = result
      console.log(result);
      console.log(route)
      setDirections(result);
      setCurrentPosition(result?.origin);
    } catch (error) {
      console.log("nesto crklo");
    }
  };

  const resetRoute = () => {
    console.log('radi')
    setDirections(directionsInit);
    setRoute(routeInit)
    updatePosition()
  };
  const isActive =
    route.startingPoint && route.endPoint
      ? "cursor-pointer"
      : "cursor-not-allowed";

  return (
    <div className={`w-full flex items-center gap-2`}>
      {/* <div className={`w-full flex items-center gap-2 ${isActive}`}> */}
      <Button
        isActive={isActive}
        scale="medium"
        text="Calculate route"
        clickHandler={(e) => calculateRouteHandler(e)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={5}
        stroke={"#a8a29e"}
        className="w-8 h-8"
        onClick={() => resetRoute()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default CalculateRoute;
