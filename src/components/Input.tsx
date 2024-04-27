import { InputComponentProps } from "../utils/types"
const Input = ({placeholder}:InputComponentProps) => {
  return (
      <input type="text" className="w-full mt-4 text-sm px-2 py-4 rounded-lg" placeholder={ placeholder} />      
  )
}

export default Input
