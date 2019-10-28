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
    mode: "modal",
    ...sharedOptions
  }
);

export default createAppContainer(PostDetailRoute);
