import { createAppContainer, createStackNavigator } from "react-navigation";
import Transition from "../screens/Transition";

const LoggedOutNavigation = createStackNavigator({
  LogIn: {
    screen: Transition,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(LoggedOutNavigation);
