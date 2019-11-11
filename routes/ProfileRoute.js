import { createStackNavigator, createAppContainer } from "react-navigation";
import Profile from "../screens/Profile";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import PrivacyPolicy from "../components/PrivacyPolicy";

const ProfileRoute = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },

    ...sharedRoutes,
    PrivacyPolicy: {
      screen: PrivacyPolicy
    }
  },
  {
    ...sharedOptions
  }
);

export default createAppContainer(ProfileRoute);
