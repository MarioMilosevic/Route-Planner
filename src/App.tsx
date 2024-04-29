import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import { useDispatch } from "react-redux";
import { usePositionSlice } from "./hooks/usePositionSlice";
import { setPosition } from "./redux/features/positionSlice/positionSlice";
import { MapSchemaFormValues, mapSchema } from "./utils/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  Libraries,
  //   DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const libraries: Libraries = ["places"];

function App() {
  const currentPosition = usePositionSlice();
  const dispatch = useDispatch();
  const form = useForm<MapSchemaFormValues>({
    defaultValues: {
      startingPoint: "",
      endPoint: "",
    },
    resolver: zodResolver(mapSchema),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        dispatch(
          setPosition({
            lat: latitude,
            lng: longitude,
          })
        );
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, [dispatch]);

  // prebacit u helper nedje
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />
          <form className="w-full">
            <Autocomplete>
              <Input text="Starting point" />
            </Autocomplete>
            <Autocomplete>
              <Input text="Destination" />
            </Autocomplete>
            <Button scale="big" text="Add stop" />
            <TravelOption />
            <CalculateRoute />
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
              {/* ako imam directionsResponse onda renderuj DirectionsRenderer directions={directionsResponse}*/}
            </GoogleMap>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default App;
