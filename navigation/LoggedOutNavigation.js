import { createAppContainer, createStackNavigator } from "react-navigation";
import Transition from "../screens/Transition";
import TakePost from "../screens/TakePost";

const LoggedOutNavigation = createStackNavigator(
  {
    Tabs: {
      screen: Transition,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    TakePost: {
      screen: TakePost,
      navigationOptions: {
        header: null
      }
    }
  },
  { mode: "modal" }
);

export default createAppContainer(LoggedOutNavigation);
