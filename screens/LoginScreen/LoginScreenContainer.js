import React, { Component } from "react";
import LoginScreenPresenter from "./LoginScreenPresenter";

class LoginScreenContainer extends Component {
  render() {
    const { handleAccountAction } = this.props;
    return <LoginScreenPresenter handleAccountAction={handleAccountAction} />;
  }
}

export default LoginScreenContainer;
