import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import {
  routeInit,
  distanceInit,
  durationInit,
} from "./utils/initialStates/initialState";
import { useState } from "react";
import { distanceType, RouteState, durationType } from "./utils/types/types";
import Loading from "./components/Loading";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Libraries,
  DirectionsRenderer,
} from "@react-google-maps/api";
import useGeolocation from "./hooks/useGeolocation";
import Information from "./components/Information";

const libraries: Libraries = ["places"];

function App() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const [route, setRoute] = useState<RouteState>(routeInit);
  const [travelMode, setTravelMode] = useState<string>("DRIVING");
  const [distance, setDistance] = useState<distanceType>(distanceInit);
  const [duration, setDuration] = useState<durationType>(durationInit);

  const { currentPosition, setCurrentPosition, updatePosition } =
    useGeolocation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const addWaypoint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const waypoint = {
      placeId: crypto.randomUUID(),
      location: "",
      stopover: true,
    };
    setRoute((prev) => {
      return { ...prev, waypoints: [...prev.waypoints, waypoint] };
    });
  };

  if (!isLoaded) return <Loading />;

  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />
          <form className="w-full">
            <Input
              id=""
              route={route}
              setRoute={setRoute}
              text="Starting point"
            />
            {route.waypoints.map((waypoint) => (
              <Input
                key={waypoint.placeId}
                id={waypoint.placeId}
                route={route}
                setRoute={setRoute}
                text="Waypoint"
              />
            ))}
            <Input id="" route={route} setRoute={setRoute} text="Destination" />
            <Button
              isActive=""
              scale="big"
              text="Add stop"
              clickHandler={(e) => addWaypoint(e)}
            />
            <TravelOption
              travelMode={travelMode}
              setTravelMode={setTravelMode}
            />
            <CalculateRoute
              travelMode={travelMode}
              route={route}
              setRoute={setRoute}
              setDirections={setDirections}
              setCurrentPosition={setCurrentPosition}
              updatePosition={updatePosition}
              setDuration={setDuration}
              setDistance={setDistance}
            />
          </form>
          {distance.distanceUnit && (
            <div className="w-full px-2 flex justify-between border rounded-lg bg-stone-200 text-stone-800">
              <Information stats={duration} title="Duration" />
              <Information stats={distance} title="Distance" />
            </div>
          )}
        </aside>
        <main>
          {isLoaded ? (
            <GoogleMap
              center={currentPosition}
              zoom={10}
              mapContainerStyle={{ width: "100%", height: "100vh" }}
            >
              <MarkerF position={currentPosition} />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default App;
