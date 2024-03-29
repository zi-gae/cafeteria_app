import { connect } from "react-redux";
import AppContainerPresenter from "./AppContainerPresenter";
import { actionCreators as postActions } from "../../redux/modules/posts";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as crawlerActions } from "../../redux/modules/crawlers";

const mapStateToProps = (state, ownProps) => {
  const { user, crawlers, posts } = state;

  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile,
    pushToken: user.push_token,
    crawlers,
    posts
  };
};

mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initApp: () => {
      dispatch(crawlerActions.getRice());
      dispatch(postActions.getPost());
      dispatch(postActions.emptySearch());
      dispatch(userActions.getNotification());
      dispatch(userActions.getOwnProfile());
    },
    dispatchPostToken: token => {
      dispatch(userActions.postToken(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainerPresenter);
