import { connect } from "react-redux";
import PostContainer from "./PostContainer";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const {
    posts: { posts }
  } = state;

  return {
    posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: () => {
      dispatch(postActions.getPost());
    },
    dispatchCreatePost: (title, content, file, anonymous) => {
      dispatch(postActions.createPost(title, content, file, anonymous));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
