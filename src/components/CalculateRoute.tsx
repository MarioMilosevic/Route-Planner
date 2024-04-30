import Button from "./Button";
import { calculateRouteFn } from "../utils/helperFunctions/helperFunctions";
const CalculateRoute = () => {

  const calculateRouteHandler = async (e) => {
    try {
      const result = await calculateRouteFn(e, startingPoint, endPoint)
      // const {origin, destination} = result
      console.log(result)
      // console.log(startingPoint)
      // dispatch(setDirections(result))
      // dispatch(setPosition(result?.origin))
    } catch (error) {
      console.log("nesto crklo")
    }
  }
  
  // const resetRoute = () => {
  //   dispatch(setDirections(null))
  //   dispatch(addStartPoint(''))
  //   dispatch(addEndPoint(''))
  //   dispatch(resetPosition())
  // }
  // const isActive = startingPoint && endPoint ? "cursor-pointer" : "cursor-not-allowed"

  return (
    <div className={`w-full flex items-center gap-2`}>
    {/* <div className={`w-full flex items-center gap-2 ${isActive}`}> */}
      <Button
        // isActive={isActive }
        scale="medium"
        text="Calculate route"
        // clickHandler={(e => calculateRouteHandler(e))}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={5}
        stroke={"#a8a29e"}
        className="w-8 h-8"
        // onClick={() => resetRoute()}
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
