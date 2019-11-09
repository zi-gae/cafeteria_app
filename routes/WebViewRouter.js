import { createStackNavigator, createAppContainer } from "react-navigation";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import WebViewBox from "../components/WebViewBox";

const WebViewRouter = createStackNavigator(
  {
    WebViewBox: {
      screen: WebViewBox
    },

    ...sharedRoutes
  },
  {
    ...sharedOptions
  }
);

export default createAppContainer(WebViewRouter);
