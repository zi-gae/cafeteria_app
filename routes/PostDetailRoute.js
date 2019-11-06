import { createStackNavigator, createAppContainer } from "react-navigation";
import PostDetail from "../components/PostDetail";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const PostDetailRoute = createStackNavigator(
  {
    PostDetail: {
      screen: PostDetail
    },
    ...sharedRoutes
  },
  {
    ...sharedOptions
  }
);

export default createAppContainer(PostDetailRoute);
