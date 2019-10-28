import { createAppContainer, createStackNavigator } from "react-navigation";

import TabNavigation from "./TabNavigation";
import WritePostRouter from "../routes/WritePostRouter";

const RootNavigation = createStackNavigator(
  {
    Tabs: TabNavigation,
    WritePost: WritePostRouter
  },
  {
    initialRouteName: "Tabs",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(RootNavigation);
