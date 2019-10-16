import React from "react";
import SignUp from "../SignUp";
import Login from "../Login";
import PropTypes from "prop-types";

const TransitionPresenter = ({ account, handleAccountAction }) => {
  return account ? (
    <SignUp account={account} handleAccountAction={handleAccountAction} />
  ) : (
    <Login account={account} handleAccountAction={handleAccountAction} />
  );
};

TransitionPresenter.propTypes = {
  account: PropTypes.bool.isRequired,
  handleAccountAction: PropTypes.func.isRequired
};

export default TransitionPresenter;
