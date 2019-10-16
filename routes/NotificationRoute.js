import { createStackNavigator, createAppContainer } from "react-navigation";
import Notification from "../screens/Notification";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const NotificationRoute = createStackNavigator(
  {
    Notification: {
      screen: Notification
    },
    ...sharedRoutes
  },
  { ...sharedRoutes }
);

export default createAppContainer(NotificationRoute);
