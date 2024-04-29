import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import { calculateRouteFn } from "./utils/helperFunctions/helperFunctions";
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
  StandaloneSearchBox,
  //   DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouteSlice } from "./hooks/useRouteSlice";
import { addStartPoint } from "./redux/features/routeSlice/routeSlice";
const libraries: Libraries = ["places"];

function App() {
  const currentPosition = usePositionSlice();
  const { startingPoint, endPoint } = useRouteSlice();
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

  console.log("start point", startingPoint);
  console.log("end point", endPoint);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };

  // const handlePlaceChanged = () => {
  //   console.log(inputRef);
  //   const { place } = inputRef.current.getPlaces();
  //   console.log(place);
  //   if (place) {
  //     console.log(place.formatted_address);
  //   }
  // };

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input text="Starting point" />
            <Input text="Destination" />
            <Button scale="big" text="Add stop" />
            <TravelOption />
            <CalculateRoute onSubmit={handleSubmit(onSubmit)} />
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
