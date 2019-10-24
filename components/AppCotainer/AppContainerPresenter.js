import React, { Component } from "react";
import PropTypes from "prop-types";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";
import LoadingLogo from "../LoadingLogo";

class AppContainerPresenter extends Component {
  constructor() {
    super();
    this.state = {
      view: false
    };
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
  componentWillReceiveProps(nextProps, nextState) {
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
