import { connect } from "react-redux";
import AppContainerPresenter from "./AppContainerPresenter";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn
  };
};

export default connect(mapStateToProps)(AppContainerPresenter);
