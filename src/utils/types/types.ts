import { Dispatch, SetStateAction } from "react";
export type InputComponentProps = {
  text: string;
  route: RouteState;
  setRoute: Dispatch<SetStateAction<RouteState>>;
};

export type PositionState = {
  lat: number;
  lng: number;
};

export type ButtonComponentProps = {
  isActive: string;
  text: string;
  scale: string;
  clickHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | void;
};

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

export type directionsResultType = google.maps.DirectionsResult;

// export type DirectionsState = {
//   directions: directionsResultType | null;
// };

export type destination = {
  id: string;
  name: string;
  stopOver: boolean;
};

export type RouteState = {
  startingPoint: string;
  waypoints: destination[];
  endPoint: string;
};

export type CalculateRouteProps = {
  travelMode: string;
  route: RouteState;
  setDirections: Dispatch<SetStateAction<google.maps.DirectionsResult>>;
  setCurrentPosition: Dispatch<SetStateAction<PositionState>>;
  setRoute: Dispatch<SetStateAction<RouteState>>;
  updatePosition: () => void;
  setDuration: Dispatch<SetStateAction<string>>;
  setDistance: Dispatch<SetStateAction<string>>;
};

export type TravelModeState = {
  travelMode: string;
};

export type TravelModeProps = {
  travelMode: string;
  setTravelMode: Dispatch<SetStateAction<TravelModeState>>;
};

export type InformationProps = {
  title: string;
  stats: string;
};
