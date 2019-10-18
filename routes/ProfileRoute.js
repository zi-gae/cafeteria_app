import { createStackNavigator, createAppContainer } from "react-navigation";
import Profile from "../screens/Profile";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const ProfileRoute = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    ...sharedRoutes
  }
  // { ...sharedOptions }
);

export default createAppContainer(ProfileRoute);
