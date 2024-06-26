import { ButtonComponentProps } from "../utils/types/types";
const Button = ({ isActive,text, scale, clickHandler }: ButtonComponentProps) => {
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
      className={`my-8 uppercase rounded-full bg-stone-400 ${size} ${isActive} text-base py-2 text-stone-800`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
