// const [map, setMap] = useState(null);
// const [directionsResponse, setDirectionsResponse] = useState(null);
// const [distance, setDistance] = useState("");
// const [duration, setDuration] = useState("");

// const originRef = useRef();
// const destinationRef = useRef();

// const calculateRoute = async () => {
//   if (originRef.current.value === "" || destinationRef.current.value === "") {
//     return;
//   }
//   const directionsService = new google.maps.DirectionsService();
//   const results = await directionsService.route({
//     origin: originRef.current.value,
//     destination: destinationRef.current.value,
//     travelMode: google.maps.TravelMode.DRIVING,
//   });
//   setDirectionsResponse(results);
//   setDistance(results.routes[0].legs[0].distance.text);
//   setDuration(results.routes[0].legs[0].duration.text);
// };


//  <GoogleMap
//    center={kotor}
//    zoom={10}
//    mapContainerStyle={{ width: "100%", height: "100vh" }}
//    onLoad={(map) => setMap(map)}
//  >
//    <MarkerF position={kotor} />
//  </GoogleMap>;
