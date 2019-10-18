import { connect } from "react-redux";
import AppContainerPresenter from "./AppContainerPresenter";
import { actionCreators as postActions } from "../../redux/modules/posts";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;

  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile
  };
};

mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initApp: () => {
      dispatch(postActions.getPost());
      dispatch(postActions.getSearch());
      dispatch(userActions.getNotification());
      dispatch(userActions.getOwnProfile());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainerPresenter);
