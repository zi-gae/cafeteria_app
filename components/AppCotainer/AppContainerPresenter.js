import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";

class AppContainerPresenter extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { isLoggedIn } = this.props;
    return <>{isLoggedIn ? <RootNavigation /> : <LoggedOutNavigation />}</>;
  }
}

export default AppContainerPresenter;
