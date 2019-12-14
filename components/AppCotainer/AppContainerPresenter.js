import React, { Component } from "react";
import PropTypes from "prop-types";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";
import LoadingLogo from "../LoadingLogo";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { StatusBar, Platform } from "react-native";

class AppContainerPresenter extends Component {
  constructor() {
    super();
    this.state = {
      view: false
    };
  }

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    pushToken: PropTypes.string,
    initApp: PropTypes.func.isRequired,
    dispatchPostToken: PropTypes.func.isRequired
  };

  componentDidMount = async () => {
    const { isLoggedIn, initApp } = this.props;
    if (isLoggedIn) {
      this.getPermissionAsync();
      const result = await initApp();
      if (result) {
        this.setState({
          view: true
        });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.crawlers !== this.props.crawlers) {
      this.setState({
        view: true
      });
    }
  }

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { dispatchPostToken } = this.props;
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      dispatchPostToken(token);
      if (status !== "granted") {
      }
    }
  };

  render() {
    const { isLoggedIn, profile } = this.props;
    const { view } = this.state;

    return (
      <>
        <StatusBar
          hidden={false}
          barStyle={
            Platform.OS === "android" ? "light-content" : "dark-content"
          }
        />
        {isLoggedIn && profile ? (
          view ? (
            <RootNavigation
              screenProps={{
                username: profile.username,
                view
              }}
            />
          ) : (
            <LoadingLogo />
          )
        ) : (
          <LoggedOutNavigation />
        )}
      </>
    );
  }
}

export default AppContainerPresenter;
