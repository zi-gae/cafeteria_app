import React, { Component } from "react";
import SignUpPresenter from "./SignUpScreenPresenter";
import { Alert } from "react-native";
class SignUpScreenContainer extends Component {
  constructor() {
    super();
    this.state = {
      stdntnum: "",
      username: "",
      password1: "",
      password2: "",
      nickname: "",
      isSubmitting: false
    };
  }
  changeUsername = text => {
    this.setState({
      username: text
    });
  };
  changePasswordOne = text => {
    this.setState({
      password1: text
    });
  };
  changePasswordTwo = text => {
    this.setState({
      password2: text
    });
  };
  changeNickname = text => {
    this.setState({
      nickname: text
    });
  };
  changeStdntNumber = text => {
    this.setState({
      stdntnum: text
    });
  };
  handleSubmit = () => {
    const {
      username,
      password1,
      password2,
      stdntnum,
      nickname,
      isSubmitting
    } = this.state;
    if (!isSubmitting) {
      if (username && password1 && password2 && stdntnum && nickname) {
        if (password1 === password2) {
          Alert.alert("비밀번호가 일치하지 않습니다!");
        } else {
          this.setState({
            isSubmitting: true
          });
        }
        // reducer action
      } else {
        Alert.alert("모두 입력 해주세요!");
      }
    }
  };

  nextSubmitAction = () => {};

  render() {
    const {
      changeUsername,
      changePasswordOne,
      changePasswordTwo,
      changeNickname,
      changeStdntNumber,
      handleSubmit
    } = this;
    const { handleAccountAction } = this.props;
    const { stdntnum, username, password1, password2, nickname } = this.state;
    return (
      <SignUpPresenter
        stdntnum={stdntnum}
        username={username}
        password1={password1}
        password2={password2}
        nickname={nickname}
        handleAccountAction={handleAccountAction}
        changeUsername={changeUsername}
        changePasswordOne={changePasswordOne}
        changePasswordTwo={changePasswordTwo}
        changeNickname={changeNickname}
        changeStdntNumber={changeStdntNumber}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default SignUpScreenContainer;
