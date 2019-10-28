import { createAppContainer, createStackNavigator } from "react-navigation";
import Transition from "../screens/Transition";

const LoggedOutNavigation = createStackNavigator({
  Tabs: {
    screen: Transition,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(LoggedOutNavigation);
