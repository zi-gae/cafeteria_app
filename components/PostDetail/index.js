import PostDetailContainer from "./PostDetailContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const {
    navigation: {
      state: {
        params: { id }
      }
    }
  } = ownProps;
  let sample;
  state.posts.posts.map(post => {
    if (post.id === id) {
      sample = post;
    }
  });

  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    navigation: {
      state: {
        params: { id }
      }
    }
  } = ownProps;

  return {
    dispatchLike: isLiked => {
      if (isLiked) {
        return dispatch(postActions.unLikePost(id));
      } else {
        return dispatch(postActions.likePost(id));
      }
    },
    disaptchCommentPost: (message, isChecked, referComment = null) => {
      return dispatch(
        postActions.commentPost(id, message, isChecked, referComment)
      );
    },
    disaptchCommentDelete: commentId => {
      return dispatch(postActions.commentDelete(id, commentId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);
