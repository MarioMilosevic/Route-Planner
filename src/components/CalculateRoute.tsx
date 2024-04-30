import Button from "./Button";
import { calculateRouteFn } from "../utils/helperFunctions/helperFunctions";
import { CalculaterRouteProps } from "../utils/types/types";
import { directionsInit, routeInit } from "../utils/initialStates/initialState";

const CalculateRoute = ({travelMode ,route, setDirections, setRoute,updatePosition, setDuration, setDistance }: CalculaterRouteProps) => {
  const calculateRouteHandler = async (e) => {
    try {
      const result = await calculateRouteFn(e, route, travelMode);
      const resultRoute = result?.routes[0].legs[0]
      console.log(resultRoute?.duration?.text)
      console.log(resultRoute?.distance?.text)
      setDuration(resultRoute?.duration.text)
      setDistance(resultRoute?.distance.text)
      // console.log(result?.routes[0].distance.text)
      setDirections(result);
    } catch (error) {
      console.log("calculateRouteHandler ne radi");
    }
  };

  const resetRoute = () => {
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
