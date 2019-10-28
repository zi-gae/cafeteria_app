import { createAppContainer, createStackNavigator } from "react-navigation";

import TabNavigation from "./TabNavigation";
import WritePostRouter from "../routes/WritePostRouter";
import PostDetailRouter from "../routes/PostDetailRoute";

const RootNavigation = createStackNavigator(
  {
    Tabs: TabNavigation,
    WritePost: WritePostRouter,
    PostDetail: PostDetailRouter
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
