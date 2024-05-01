import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import { routeInit } from "./utils/initialStates/initialState";
import { useState } from "react";
import { RouteState } from "./utils/types/types";
import { MapSchemaFormValues, mapSchema } from "./utils/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCoordsForAddress } from "./utils/helperFunctions/helperFunctions";
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
import Information from "./components/Information";

const libraries: Libraries = ["places"];

function App() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const [route, setRoute] = useState<RouteState>(routeInit);
  const [travelMode, setTravelMode] = useState<string>("DRIVING");
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

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
    const waypoint = { placeId: crypto.randomUUID(), location:"", stopover:true };
    setRoute((prev) => {
      return { ...prev, waypoints: [...prev.waypoints, waypoint] };
    });
  };

  // const getInputId = (id: string) => {
  //   setInputId(id);
  // };
  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };
  if (!isLoaded) return <Loading />;
  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              route={route}
              setRoute={setRoute}
              text="Starting point"
            />
            {route.waypoints.map((waypoint) => (
              <Input
                key={waypoint.placeId}
                id={ waypoint.placeId}
                route={route}
                setRoute={setRoute}
                text="Waypoint"
              />
            ))}
            <Input
              route={route}
              setRoute={setRoute}
              text="Destination"
            />
            <Button scale="big" text="Add stop" clickHandler={addWaypoint} />
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
              onSubmit={handleSubmit(onSubmit)}
              setDuration={setDuration}
              setDistance={setDistance}
            />
          </form>
          {duration && distance && (
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

// ubacim u array [{location:Cetinje, Montenegro}, {location:Kotor, Montenegro}]
// forEach(location => da ih ubacim u waypoints array ili neki drugi, te koordinate i onda to proslijedim u onaj fetch) 