import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const useRouteSlice = () => {
  const route = useSelector((state: RootState) =>state.route );
  return route;
};
