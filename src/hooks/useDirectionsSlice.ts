import { useSelector } from "react-redux"
import { RootState } from "../redux/store/store"

export const useDirectionsSlice = () => {
    const directions = useSelector((state: RootState) => state.directions)
    return directions
}