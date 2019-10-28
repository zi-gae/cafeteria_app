import React from "react";
import Search from "../screens/Search";
import { BG_COLOR_WHITE, LIGTH_GREEN } from "../constants/Color";
import NavButton from "../components/NavButton";
import PostDetail from "../components/PostDetail";
import WritePost from "../components/WritePost";

const sharedRoutes = {
  Search: {
    screen: Search
  }
};

const sharedOptions = {
  defaultNavigationOptions: {
    headerLeft: props => (
      <NavButton {...props} iconName={"ios-arrow-back"} color={LIGTH_GREEN} />
    ),
    headerStyle: {
      backgroundColor: BG_COLOR_WHITE,
      levation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  }
};

export { sharedOptions };

export default sharedRoutes;
