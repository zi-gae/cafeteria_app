import React, { Component } from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import LoginPresenter from "./LoginPresenter";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isSubmitting: false
    };
  }

  static propTypes = {
    dispatchLogin: PropTypes.func.isRequired,
    dispatchGetRice: PropTypes.func.isRequired
  };

  handleSubmit = async () => {
    const { username, password, isSubmitting } = this.state;
    const { dispatchLogin, dispatchGetRice } = this.props;

    if (!isSubmitting) {
      if (username && password) {
        this.setState({
          isSubmitting: true
        });
        const loginResult = await dispatchLogin(username, password);
        if (!loginResult) {
          Alert.alert("아이디 또는 비밀번호가 틀렸습니다. 다시 시도 해주세요!");
          this.setState({
            isSubmitting: false
          });
        } else {
          await dispatchGetRice();
        }
      } else {
        if (!username) {
          Alert.alert("아이디를 입력하세요!");
        } else {
          Alert.alert("비밀번호를 입력하세요!");
        }
      }
    }
  };

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

  render() {
    const { handleAccountAction } = this.props;
    const { username, password, isSubmitting } = this.state;
    const { changeUsername, changePassword, handleSubmit } = this;

    return (
      <LoginPresenter
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

export default LoginContainer;
