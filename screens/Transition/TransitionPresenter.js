import React from "react";
import SignUpScreen from "../SignUpScreen";
import LoginScreen from "../LoginScreen";
import PropTypes from "prop-types";

const TransitionPresenter = ({ account, handleAccountAction }) => {
  return account ? (
    <SignUpScreen account={account} handleAccountAction={handleAccountAction} />
  ) : (
    <LoginScreen account={account} handleAccountAction={handleAccountAction} />
  );
};

//proptypes

export default TransitionPresenter;
