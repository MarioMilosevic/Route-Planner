

export const calculateRouteFn = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  route,
  travelMode
) => {
  e.preventDefault();
  console.log(travelMode)
  const {startingPoint, endPoint, waypoints} = route
  if (startingPoint === "" || endPoint === "") {
    return;
  }
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: startingPoint,
    destination: endPoint,
    waypoints,
    travelMode: google.maps.TravelMode[travelMode],
    // travelMode: google.maps.TravelMode.DRIVING,
  });
  console.log(results);
  return results
};

