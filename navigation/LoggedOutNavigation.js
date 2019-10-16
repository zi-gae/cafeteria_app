import { createAppContainer, createStackNavigator } from "react-navigation";
import Transition from "../screens/Transition";

const LoggedOutNavigation = createStackNavigator({
  LogIn: {
    screen: Transition
  }
});

export default createAppContainer(LoggedOutNavigation);
