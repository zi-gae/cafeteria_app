import { createStackNavigator, createAppContainer } from "react-navigation";
import Post from "../screens/Post";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const PostRoute = createStackNavigator(
  {
    Posts: {
      screen: Post
    },
    ...sharedRoutes
  },
  {
    ...sharedOptions
  }
);

export default createAppContainer(PostRoute);
