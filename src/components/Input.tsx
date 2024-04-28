import { InputComponentProps } from "../utils/types";
const Input = ({ text }: InputComponentProps) => {
  return (
    <input
      type="text"
      className="w-full mt-4 text-sm p-4 text-black rounded-lg transition-all duration-300 placeholder:text-stone-400 focus:ring focus:ring-green-500 focus:outline-none"
      placeholder={text}
    />
  );
};

export default Input;
