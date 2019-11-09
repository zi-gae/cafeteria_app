import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNavigation from "./TabNavigation";
import WritePostRouter from "../routes/WritePostRouter";
import PostDetailRouter from "../routes/PostDetailRoute";
import WebViewRouter from "../routes/WebViewRouter";

const RootNavigation = createStackNavigator(
  {
    Tabs: TabNavigation,
    WritePost: WritePostRouter,
    PostDetail: PostDetailRouter,
    WebView: WebViewRouter
  },
  {
    initialRouteName: "Tabs",
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(RootNavigation);
