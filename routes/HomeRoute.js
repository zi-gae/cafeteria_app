import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const HomeRoute = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    ...sharedRoutes
  },
  { ...sharedOptions }
);

export default createAppContainer(HomeRoute);
