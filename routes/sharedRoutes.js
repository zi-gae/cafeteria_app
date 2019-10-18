import React from "react";
import Likes from "../screens/Likes";
import Posts from "../screens/Posts";
import { BG_COLOR_WHITE } from "../constants/Color";
import NavButton from "../components/NavButton";

const sharedRoutes = {
  Posts: {
    screen: Posts
  },
  Likes: {
    screen: Likes
  }
};
const sharedOptions = {
  defaultNavigationOptions: {
    headerLeft: props => <NavButton {...props} iconName={"ios-arrow-back"} />
  },
  headerStyle: {
    backgroundColor: BG_COLOR_WHITE
  }
};

export { sharedOptions };

export default sharedRoutes;
