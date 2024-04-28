import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import {
//   useLoadScript,
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
//   DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useState, useEffect } from "react";

const kotor = { lat: 42.4247, lng: 18.7712 };

function App() {
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(kotor);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <div className="grid grid-cols-[450px,1fr]">
        <aside className="bg-black flex flex-col items-center max-h-screen p-4 text-green-50">
          <Title />

          <Autocomplete className="w-full bg-none">
            <Input text="Starting point" />
          </Autocomplete>
          <Autocomplete className="w-full">
            <Input text="Destination" />
          </Autocomplete>

          <Button scale="big" text="Add stop" />
          <TravelOption />
          <CalculateRoute />
        </aside>
        <main>
          {isLoaded ? (
            <GoogleMap
              center={kotor}
              zoom={10}
              mapContainerStyle={{ width: "100%", height: "100vh" }}
              onLoad={onLoad}
            >
              <MarkerF position={kotor} />
            </GoogleMap>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default App;
