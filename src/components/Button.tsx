import { ButtonComponentProps } from "../utils/types/types";
import { useRouteSlice } from "../hooks/useRouteSlice";
const Button = ({ text, scale, clickHandler }: ButtonComponentProps) => {
  const { startingPoint, endPoint } = useRouteSlice();

  const size =
    scale === "big"
      ? "w-full"
      : scale === "medium"
      ? "w-[50%]"
      : scale === "small"
      ? "w-[25%]"
      : "";
  return (
    <button
      className={`my-8 uppercase rounded-full cursor-not-allowed bg-stone-400 ${size} text-base py-2 text-stone-800`}
      onClick={(e) => clickHandler(e, startingPoint, endPoint)}
    >
      {text}
    </button>
  );
};

export default Button;
