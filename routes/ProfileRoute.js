import { createStackNavigator, createAppContainer } from "react-navigation";
import Profile from "../screens/Profile";
import sharedRoutes from "./sharedRoutes";

const ProfileRoute = createStackNavigator({
  Profile: {
    screen: Profile
  },
  ...sharedRoutes
});

export default createAppContainer(ProfileRoute);
