import { createAppContainer, createStackNavigator } from "react-navigation";
import TakePost from "../screens/TakePost";
import TabNavigation from "./TabNavigation";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
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

export default createAppContainer(RootNavigation);
