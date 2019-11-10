import React, { Component } from "react";
import PropTypes from "prop-types";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";
import LoadingLogo from "../LoadingLogo";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

class AppContainerPresenter extends Component {
  constructor() {
    super();
    this.state = {
      view: false
    };
  }

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired,
    dispatchPostToken: PropTypes.func.isRequired
  };

  componentDidMount = async () => {
    const { isLoggedIn, initApp, dispatchPostToken } = this.props;

    if (isLoggedIn) {
      await initApp();
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
      }
      let token = await Notifications.getExpoPushTokenAsync();
      dispatchPostToken(token);
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.crawlers !== this.props.crawlers) {
      this.setState({
        view: true
      });
    }
  }

  render() {
    const { isLoggedIn, profile } = this.props;

    return (
      <>
        {isLoggedIn && profile ? (
          this.state.view ? (
            <RootNavigation
              screenProps={{
                username: profile.username,
                view: this.state.view
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
