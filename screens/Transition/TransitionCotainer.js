import React, { Component } from "react";
import TransitionPresenter from "./TransitionPresenter";

class TransitionCotainer extends Component {
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
    const { account } = this.state;
    return (
      <TransitionPresenter
        handleAccountAction={handleAccountAction}
        account={account}
      />
    );
  }
}

export default TransitionCotainer;
