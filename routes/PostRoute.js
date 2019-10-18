import { createStackNavigator, createAppContainer } from "react-navigation";
import Posts from "../screens/Posts";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const PostRoute = createStackNavigator(
  {
    Posts: {
      screen: Posts
    },
    ...sharedRoutes
  },
  { ...sharedOptions }
);

export default createAppContainer(PostRoute);
