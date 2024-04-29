export type InputComponentProps = {
  text: string;
};

export type ButtonComponentProps = {
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
