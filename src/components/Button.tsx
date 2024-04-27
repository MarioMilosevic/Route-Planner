import { ButtonComponentProps } from "../utils/types";
const Button = ({ text, scale }: ButtonComponentProps) => {
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
      className={`my-8 uppercase rounded-full bg-stone-400 ${size} text-base py-2 text-stone-800`}
    >
      {text}
    </button>
  );
};

export default Button;
