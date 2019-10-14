import React, { Component } from "react";
import SignUpPresenter from "./SignUpScreenPresenter";

class SignUpScreenContainer extends Component {
  constructor() {
    super();
    this.state = {
      stdntnum: "",
      username: "",
      password1: "",
      password2: "",
      nickname: ""
    };
  }
  handleInputChage = e => {
    console.log(e);
  };

  _handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    const { handleInputChage } = this;
    const { handleAccountAction } = this.props;
    const { stdntnum, username, password1, password2, nickname } = this.state;
    return (
      <SignUpPresenter
        stdntnum={stdntnum}
        username={username}
        ㄹ
        password1={password1}
        password2={password2}
        nickname={nickname}
        handleInputChage={handleInputChage}
        handleAccountAction={handleAccountAction}
      />
    );
  }
}

export default SignUpScreenContainer;
