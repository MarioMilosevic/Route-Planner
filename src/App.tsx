import Input from "./components/Input";
import Button from "./components/Button";
import TravelOption from "./components/TravelOption";
import Title from "./components/Title";
import CalculateRoute from "./components/CalculateRoute";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
//   DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
const libraries = ["places"]

function App() {
 const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

 useEffect(() => {
   if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition(function (position) {
         console.log(position)
       setCurrentPosition({
         lat: position.coords.latitude,
         lng: position.coords.longitude,
       });
     });
   } else {
     console.log("Geolocation is not available in your browser.");
   }
 }, []);    



  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });



    if (!isLoaded) return <h1>Loading...</h1>;
    console.log(currentPosition)
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
              center={currentPosition}
              zoom={10}
              mapContainerStyle={{ width: "100%", height: "100vh" }}
            >
              <MarkerF position={currentPosition} />
            </GoogleMap>
          ) : null}
        </main>
          </div>
    </>
  );
}

export default App;
