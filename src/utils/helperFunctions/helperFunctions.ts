export const calculateRouteFn = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  start: string,
  end: string
) => {
  e.preventDefault();
  if (start === "" || end === "") {
    return;
  }
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
  });
  console.log(start);
  console.log(end);
  console.log(results);
};

// setDirectionsResponse(results);
// setDistance(results.routes[0].legs[0].distance.text);
// setDuration(results.routes[0].legs[0].duration.text);
