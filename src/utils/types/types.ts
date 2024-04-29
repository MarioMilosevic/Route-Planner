export type InputComponentProps = {
    text:string
}

export type ButtonComponentProps = {
  text: string;
  scale: string;
  clickHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    startingPoint: string,
    endPoint: string
  ) => void;
};

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};