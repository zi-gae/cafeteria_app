import { createStackNavigator, createAppContainer } from "react-navigation";
import Search from "../screens/Search";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const SearchRoute = createStackNavigator(
  {
    Search: {
      screen: Search
    },
    ...sharedRoutes
  },
  { ...sharedOptions }
);

export default createAppContainer(SearchRoute);
