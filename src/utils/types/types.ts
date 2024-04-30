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
  ) => Promise<google.maps.DirectionsResult | undefined>;
};

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

export type directionsResultType = google.maps.DirectionsResult;

export type DirectionsState = {
  directions: directionsResultType | null;
};

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
