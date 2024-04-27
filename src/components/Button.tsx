import { ButtonComponentProps } from "../utils/types"
const Button = ({text}:ButtonComponentProps) => {
  return (
    <button className="my-8 uppercase rounded-full bg-stone-400 w-full text-base py-2 text-stone-800">
      {text}
    </button>
  )
}

export default Button
