import React, { Component } from "react";
import LoginScreenPresenter from "./LoginScreenPresenter";
import { Alert } from "react-native";
class LoginScreenContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isSubmitting: false
    };
  }

  changeUsername = text => {
    this.setState({
      username: text
    });
  };

  changePassword = text => {
    this.setState({
      password: text
    });
  };

  handleSubmit = () => {
    const { username, password, isSubmitting } = this.state;
    if (!isSubmitting) {
      if (username && password) {
        this.setState({
          isSubmitting: true
        });
        // reducer action
      } else {
        if (!username) {
          Alert.alert("아이디를 입력하세요!");
        } else {
          Alert.alert("비밀번호를 입력하세요!");
        }
      }
    }
  };

  render() {
    const { handleAccountAction } = this.props;
    const { username, password, isSubmitting } = this.state;
    const { changeUsername, changePassword, handleSubmit } = this;
    return (
      <LoginScreenPresenter
        handleAccountAction={handleAccountAction}
        username={username}
        password={password}
        isSubmitting={isSubmitting}
        changeUsername={changeUsername}
        changePassword={changePassword}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default LoginScreenContainer;
