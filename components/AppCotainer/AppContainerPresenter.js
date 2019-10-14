import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";

const View = styled.View`
  /* flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center; */
`;
const Text = styled.Text``;

class AppContainerPresenter extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <>{isLoggedIn ? <Text>로그인 상태</Text> : <LoggedOutNavigation />}</>
    );
  }
}

export default AppContainerPresenter;
