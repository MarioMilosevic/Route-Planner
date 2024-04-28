import { useSelector } from "react-redux"
import { RootState } from "../redux/store/store"

export const usePositionSlice = () => {
    const position = useSelector((state: RootState) => state.position)
    return position
}