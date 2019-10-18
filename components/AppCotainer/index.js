import { connect } from "react-redux";
import AppContainerPresenter from "./AppContainerPresenter";
import { actionCreators as postActions } from "../../redux/modules/posts";

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
      //notifi
      //profile
    }
  };
};

export default connect(mapStateToProps)(AppContainerPresenter);
