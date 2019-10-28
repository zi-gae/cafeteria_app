import { createStackNavigator, createAppContainer } from "react-navigation";
import WritePost from "../components/WritePost";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const WritePostRouter = createStackNavigator(
  {
    WritePost: {
      screen: WritePost
    },
    ...sharedRoutes
  },
  { ...sharedOptions }
);

export default createAppContainer(WritePostRouter);
