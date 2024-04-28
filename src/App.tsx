import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import {
  useLoadScript,
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const kotor = { lat: 42.4247, lng: 18.7712 };

function App() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
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
              onLoad={(map) => setMap(map)}
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

// pocetna pozicija, distanca, vrijeme, ruta
// 
