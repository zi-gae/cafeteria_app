import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import HomeRoute from "../routes/HomeRoute";
import NotificationRoute from "../routes/NotificationRoute";
import DormitoryOutRoute from "../routes/DormitoryOutRoute";
import PostRoute from "../routes/PostRoute";
import ProfileRoute from "../routes/ProfileRoute";
import { BG_COLOR_WHITE, LIGTH_GREEN, LIGHT_GREY } from "../constants/Color";

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name="ios-home"
              size={30}
              color={focused ? LIGTH_GREEN : LIGHT_GREY}
            />
          );
        }
      }
    },
    PostRoute: {
      screen: PostRoute,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="md-text"
            size={30}
            color={focused ? LIGTH_GREEN : LIGHT_GREY}
          />
        )
      })
    },
    DormitoryOut: {
      screen: DormitoryOutRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <SimpleLineIcons
              name="logout"
              size={30}
              color={focused ? LIGTH_GREEN : LIGHT_GREY}
            />
          );
        }
      }
    },
    Notification: {
      screen: NotificationRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name="ios-notifications"
              size={30}
              color={focused ? LIGTH_GREEN : LIGHT_GREY}
            />
          );
        }
      }
    },
    Profile: {
      screen: ProfileRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name="ios-person"
              size={30}
              color={focused ? LIGTH_GREEN : LIGHT_GREY}
            />
          );
        }
      }
    }
  },

  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: BG_COLOR_WHITE,
        height: 45
      }
    }
  }
);

export default TabNavigation;
