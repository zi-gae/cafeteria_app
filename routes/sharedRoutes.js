import React from "react";
import Search from "../screens/Search";
import Library from "../screens/Library/";
import { BG_COLOR_WHITE, LIGTH_GREEN } from "../constants/Color";
import NavButton from "../components/NavButton";
import Post from "../screens/Post";
import { RFValue } from "react-native-responsive-fontsize";

const sharedRoutes = {
  Search: {
    screen: Search
  },
  Library: {
    screen: Library
  },
  OwnPost: {
    screen: Post
  }
};

const sharedOptions = {
  defaultNavigationOptions: {
    headerLeft: props => (
      <NavButton {...props} iconName={"ios-arrow-back"} color={LIGTH_GREEN} />
    ),
    headerStyle: {
      backgroundColor: BG_COLOR_WHITE,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      marginBottom: RFValue(15)
    }
  }
};

export { sharedOptions };

export default sharedRoutes;
