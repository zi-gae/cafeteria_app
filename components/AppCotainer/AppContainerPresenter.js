import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;
const StatusBar = styled.StatusBar``;

class AppContainerPresenter extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <View>
        {/* <StatusBar hidden={true} /> */}
        {isLoggedIn ? <Text>로그인 상태</Text> : <Text>로그아웃 상태</Text>}
      </View>
    );
  }
}

export default AppContainerPresenter;
