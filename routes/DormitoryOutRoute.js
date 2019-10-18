import { createStackNavigator, createAppContainer } from "react-navigation";
import DormitoryOut from "../screens/DormitoryOut";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const DormitoryOutRoute = createStackNavigator(
  {
    DormitoryOut: {
      screen: DormitoryOut
    },
    ...sharedRoutes
  },
  { ...sharedOptions }
);

export default createAppContainer(DormitoryOutRoute);
