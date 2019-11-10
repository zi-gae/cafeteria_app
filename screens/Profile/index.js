import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user, posts } = state;
  return {
    user,
    posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modifyMyProfile: (profileImage, nickname) => {
      dispatch(userActions.putProfile(profileImage, nickname));
    },
    logout: () => {
      dispatch(userActions.logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
