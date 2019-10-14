import React, { Component } from "react";
import LoginScreenPresenter from "./LoginScreenPresenter";

class LoginScreenContainer extends Component {
  constructor() {
    super();
    this.state = {
      account: false
    };
  }

  handleAccountAction = () => {
    this.setState((prevState, props) => {
      const { account } = prevState;
      if (account === true) {
        return { account: false };
      } else if (account === false) {
        return { account: true };
      }
    });
  };

  render() {
    const { handleAccountAction } = this;

    return <LoginScreenPresenter handleAccountAction={handleAccountAction} />;
  }
}

export default LoginScreenContainer;
