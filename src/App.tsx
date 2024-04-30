import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import { directionsInit, routeInit } from "./utils/initialStates/initialState";
import { useState } from "react";
import { DirectionsState, RouteState } from "./utils/types/types";
import { MapSchemaFormValues, mapSchema } from "./utils/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "./components/Loading";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Libraries,
  DirectionsRenderer,
} from "@react-google-maps/api";
import useGeolocation from "./hooks/useGeolocation";
import { useForm } from "react-hook-form";
import { get } from "http";

const libraries: Libraries = ["places"];

function App() {
  const [directions, setDirections] = useState<DirectionsState>(directionsInit);
  const [route, setRoute] = useState<RouteState>(routeInit);
  const [inputId, setInputId] = useState();
  const [travelMode, setTravelMode] = useState<string>("DRIVING ")

  const form = useForm<MapSchemaFormValues>({
    defaultValues: {
      startingPoint: "",
      endPoint: "",
    },
    resolver: zodResolver(mapSchema),
  });
  const { handleSubmit } = form;

  const { currentPosition, setCurrentPosition, updatePosition } =
    useGeolocation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const addWaypoint = () => {
    const waypoint = { id: crypto.randomUUID(), name: "Waypoint" };
    setRoute((prev) => {
      return { ...prev, waypoints: [...prev.waypoints, waypoint] };
    });
  };

  const getInputId = (id: string) => {
    setInputId(id);
  };

  console.log(route);
  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };
  if (!isLoaded) return <Loading />;
console.log(travelMode)
  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              route={route}
              setRoute={setRoute}
              inputId={inputId}
              getInputId={getInputId}
              text="Starting point"
            />
            {route.waypoints.map((waypoint) => (
              <Input
                key={waypoint.id}
                inputId={inputId}
                getInputId={getInputId}
                route={route}
                setRoute={setRoute}
                text={waypoint.name}
              />
            ))}
            <Input
              route={route}
              setRoute={setRoute}
              inputId={inputId}
              getInputId={getInputId}
              text="Destination"
            />
            <Button scale="big" text="Add stop" clickHandler={addWaypoint} />
            <TravelOption travelMode={travelMode} setTravelMode={setTravelMode } />
            <CalculateRoute
              travelMode={travelMode }
              route={route}
              setDirections={setDirections}
              setCurrentPosition={setCurrentPosition}
              updatePosition={updatePosition}
              setRoute={setRoute}
              onSubmit={handleSubmit(onSubmit)}
            />
          </form>
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
