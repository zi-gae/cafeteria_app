import React, { Component } from "react";
import PropTypes from "prop-types";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";

class AppContainerPresenter extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { isLoggedIn, initApp } = this.props;
    if (isLoggedIn) {
      initApp();
    }
  }

  render() {
    const { isLoggedIn, profile } = this.props;

    return (
      <>
        {isLoggedIn && profile ? (
          <RootNavigation screenProps={{ username: profile.username }} />
        ) : (
          <LoggedOutNavigation />
        )}
      </>
    );
  }
}

export default AppContainerPresenter;
