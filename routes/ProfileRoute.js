import { createStackNavigator, createAppContainer } from "react-navigation";
import Profile from "../screens/Profile";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import PrivacyPolicy from "../components/PrivacyPolicy";
import StudentAuthentication from "../components/StudentAutentication";

const ProfileRoute = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },

    ...sharedRoutes,
    PrivacyPolicy: {
      screen: PrivacyPolicy
    },
    StudentAuthentication: {
      screen: StudentAuthentication
    }
  },
  {
    ...sharedOptions
  }
);

export default createAppContainer(ProfileRoute);
