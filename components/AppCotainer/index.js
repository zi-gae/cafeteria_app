import { connect } from "react-redux";
import AppContainerPresenter from "./AppContainerPresenter";
import { actionCreators as postActions } from "../../redux/modules/posts";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as crawlerActions } from "../../redux/modules/crawlers";

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
      dispatch(postActions.emptySearch());
      dispatch(userActions.getNotification());
      dispatch(userActions.getOwnProfile());
      dispatch(crawlerActions.getRice());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainerPresenter);
